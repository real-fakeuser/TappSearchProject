import './components/siteconstructor/insert';
//import './components/accordionElements/createModule';
import searchEngine from './components/listContainer/searchengine';
import searchBar from './components/searchbar/container';
import accordionList from './components/accordionElements/accordionList';

//import searchEngine from './components/searchbar/searchbar';

const init = async () => {
    await chayns.ready;
    /*document.querySelector('#SiteSearch').value = 'Tobit';
    let objtest = new searchEngine();
    objtest.search();

    let objSearchBar = new searchBar();

    document.querySelector('#searchbar').appendChild(objSearchBar.searchBarBox(new searchEngine().keyUpSearch));
*/
//############### create wrapper
      let objListWrapper = new accordionList();
      document.querySelector('#resultList').appendChild(objListWrapper.searchAccordion());
      let objSearchBar = new searchBar();
      let objSearchLogic = new searchEngine();
      document.querySelector('#searchbar').appendChild(objSearchBar.searchBarBox(objSearchLogic.keyUpSearch));
      objSearchLogic.search();



//##############################


};

init();
