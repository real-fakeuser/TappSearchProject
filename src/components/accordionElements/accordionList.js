import htmlToElement from 'html-to-element'

export default class accordionListModule {
    constructor() {}

    searchAccordion = (action) => {

        let accordionForm = htmlToElement(`
        <div class="accordion accordion--fixed accordion--open">
            <div class="accordion__head no-arrow">
                <div id="searchbar">
                </div>
            </div>
            <div class="accordion__body">
                <div id="siteList">
                </div>
                <div id="showMore">
                </div>
            </div>
        </div>
                    `);
        return accordionForm;
    }
}