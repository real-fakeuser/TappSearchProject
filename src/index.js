import searchEngine from './components/listContainer/searchengine';
import searchBar from './components/searchbar/container';
import accordionList from './components/accordionElements/accordionList';
import showMoreBtn from './components/accordionElements/showMoreBtn';
import Formular from './components/formContainer/formularContainer';
import button from './components/formContainer/submitButton';


const init = async () => {
    await chayns.ready;
//############### Form
      let frmContainer = document.querySelector('#addForm');
      frmContainer.appendChild(new Formular().collapsedfrm());
      let submitButton = document.querySelector('#submitButton');
      submitButton.appendChild(new button().submitButton());
//###############

//############### create wrapper
      let objListWrapper = new accordionList();
      let objSearchBar = new searchBar();
      let objShowMore = new showMoreBtn();
      let listWrapper = document.querySelector('#resultList');
      listWrapper.appendChild(objListWrapper.searchAccordion());                                            //creates the basic structure of the accordion
      document.querySelector('#showMore').appendChild(objShowMore.block(new searchEngine().enlargeList));   //adds the show more button and event listener
      let searchBox = document.querySelector('#searchbar');
      searchBox.appendChild(objSearchBar.searchBarBox(new searchEngine().keyUpSearch));                     //creates searchbar and key up event
      new searchEngine().search('Tobit');                                                                   //Creates a search request



//##############################


};

init();
