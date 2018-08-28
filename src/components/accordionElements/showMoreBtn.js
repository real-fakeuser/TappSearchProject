import htmlToElement from 'html-to-element'

export default class showMore {
    constructor() {}

    block = (action) => {

        let showMore = htmlToElement(`
                <div class="flex-container ShowMoreLink">
                        <a href="#" >Mehr anzeigen</a>
                </div>
                    `);
        showMore.addEventListener("click", action);
        return showMore;
    }
}