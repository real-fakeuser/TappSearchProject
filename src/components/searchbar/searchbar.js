



import searchBar from './container';
let objSearchBar = new searchBar();
document.querySelector('#searchbar').appendChild(objSearchBar.searchBarBox());
import searchEngine from '../listContainer/searchengine';
let objSearch = new searchEngine();
document.querySelector('#SiteSearch').onkeyup = objSearch.keyUpSearch;






/*


<h1>Tapp finder</h1>
                <div class="flex-container">
                    <div class="Suche Suche--accordion searchbar">
                        <input id="SiteSearch" class="input searchIn" type="text" placeholder="Suche" required>
                        <i class="fa fa-search searchIcon" aria-hidden="true" id="faSearchIcon"></i>
                    </div>
                </div>*/