import htmlToElement from 'html-to-element'

export default class searchBar {
    constructor() {}

    searchBarBox = () => {

        let searchBar = htmlToElement(`
                                    <div>
                                        <h1>Tapp finder</h1>
                                        <div class="flex-container">
                                            <div class="Suche Suche--accordion searchbar">
                                                <input id="SiteSearch" class="input searchIn" type="text" placeholder="Suche" required>
                                                <i class="fa fa-search searchIcon" aria-hidden="true" id="faSearchIcon"></i>
                                            </div>
                                        </div>
                                    </div>
                    `);
        
        return searchBar;
    }
}