


import accordionListModule from "../accordionElements/accordionList";
let objAddList = new accordionListModule();
//console.log(objAddList.searchAccordion());
document.querySelector('#resultList').appendChild(objAddList.searchAccordion());
import searchEngine from "../listContainer/searchengine"
let objSearchEngine = new searchEngine();

document.querySelector('#showMore').addEventListener("click", objSearchEngine.enlargeList);






