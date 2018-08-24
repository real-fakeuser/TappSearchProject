import getLatestVersion, { Package } from './getLatestVersion';
import { execFile } from 'mz/child_process';
import { readFile } from 'mz/fs';
import { join } from 'path';
import { URL } from 'url';
import Ora = require('ora');

let commit = true;

for (let i = 2; i < process.argv.length; i++) {
  switch (process.argv[i]) {
    case '--no-commit':
      commit = false;
      break;

    default:
      console.error('error: unexpected argument:', process.argv[i]);
      console.error('update-website [--no-commit]');
      process.exit(-1);
  }
}

async function readPackage(): Promise<Package> {
  let content = await readFile(join(__dirname, '../package.json'), { encoding: 'utf8' });
  return JSON.parse(content);
}

async function run(command: string, args: Array<string>): Promise<{ stdout: string, stderr: string }> {
  let [ stdout, stderr ] = await execFile(command, args);
  return { stdout, stderr };
}

async function gitRevParse(ref: string): Promise<string> {
  let { stdout } = await run('git', ['rev-parse', ref]);
  return stdout.trim();
}

async function hasChanges(): Promise<boolean> {
  // update the cache
  await run('git', ['status']);

  try {
    await run('git', ['diff-index', '--exit-code', 'HEAD', '--']);
    return false;
  } catch (err) {
    return true;
  }
}

/**
 * Travis jobs numbers have the build number, then a period, then the job number
 * within that build. So if the build number is "4", the job number might be
 * "4.1". If we have a job number then we're the primary instance if we are the
 * first job of our build.
 */
function isPrimaryInstance(): boolean {
  let jobNumber = process.env['TRAVIS_JOB_NUMBER'];

  if (!jobNumber) {
    return true;
  }

  return jobNumber.endsWith('.1');
}

async function updateWebsite(spinner: Ora): Promise<number> {
  spinner.start();

  if (await hasChanges()) {
    spinner.fail('Please reset your local changes before running this script');
    return 1;
  }

  let pkg = await readPackage();
  let latestVersion = await getLatestVersion(pkg);
  let currentRevision = await gitRevParse('HEAD');
  let remote = 'origin';

  spinner.text = 'Building';
  await run('yarn', ['build']);

  spinner.text = 'Switching to website branch';
  let githubToken = process.env['GH_TOKEN'];

  if (githubToken) {
    let remoteURL = new URL((await run('git', ['remote', 'get-url', remote])).stdout.trim());
    remoteURL.username = githubToken;
    remoteURL.password = '';
    await run('git', ['remote', 'set-url', remote, remoteURL.toString()]);
  }

  await run('git', ['fetch', remote, `+refs/heads/gh-pages:refs/remotes/${remote}/gh-pages`]);
  await run('git', ['reset', '--hard', `${remote}/gh-pages`]);

  spinner.text = 'Creating browser build';
  await run('browserify',[
    '--standalone', 'esnext',
    '--require', `./${pkg.main}`,
    '--outfile', 'esnext.js'
  ]);

  if (await hasChanges()) {
    if (commit) {
      spinner.text = 'Pushing changes to website';
      await run('git', ['commit', '-av', '-m', `chore: update to v${latestVersion}`]);
      await run('git', ['push', '--force', remote, 'HEAD:gh-pages']);
      spinner.succeed('Website published');
    } else {
      console.log((await run('git', ['diff'])).stdout);
    }
  } else {
    spinner.succeed('Already up to date');
  }

  await run('git', ['reset', '--hard', currentRevision]);

  return 0;
}

function shouldUpdateWebsite(): boolean {
  let pullRequest = process.env['TRAVIS_PULL_REQUEST'];

  if (pullRequest && pullRequest !== 'false') {
    return false;
  }

  let branch = process.env['TRAVIS_BRANCH'];

  return !branch || branch === 'master';
}

if (!isPrimaryInstance()) {
  console.log('Skipping website update since this is not the primary instance.');
} else if (!shouldUpdateWebsite()) {
  console.log('Skipping website update since this not a master build.');
} else {
  let spinner = Ora();
  updateWebsite(spinner)
    .then(code => {
      process.exit(code);
    })
    .catch(err => {
      spinner.fail(err.message);
      console.error(err.stack);
      process.exit(1);
    });
}
