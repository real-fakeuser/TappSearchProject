import './components/siteconstructor/insert';
//import './components/searchbar/searchbar';
import './components/accordionElements/createModule';
//import './utils/addEventListener';
import './components/searchbar/searchbar';
import searchEngine from './components/listContainer/searchengine';

//import searchEngine from './components/searchbar/searchbar';

const init = async () => {
    await chayns.ready;
  console.log("debug");
    document.querySelector('#SiteSearch').value = 'Tobit';
    let objtest = new searchEngine();
    objtest.search();

};

init();
