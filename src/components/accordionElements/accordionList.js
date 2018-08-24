import htmlToElement from 'html-to-element'

export default class siteList {
    constructor() {}

    accList = () =>{

        let accordionForm = htmlToElement(`
        <div class="accordion accordion--fixed accordion--open">
            <div class="accordion__head no-arrow">
                <h1>Tapp finder</h1>
                <div class="flex-container">
                    <div class="Suche Suche--accordion searchbar">
                        <input id="SiteSearch" class="input searchIn" type="text" placeholder="Suche" required>
                        <i class="fa fa-search searchIcon" aria-hidden="true" id="faSearchIcon"></i>
                    </div>
                </div>
            </div>
            <div class="accordion__body">
                <div id="siteList">
                </div>
                <div class="flex-container ShowMoreLink" id="showMore">
                        <a href="#" >Mehr anzeigen</a>
                    </div>
            </div>
        </div>
                    `);
        return accordionForm;
    }
}