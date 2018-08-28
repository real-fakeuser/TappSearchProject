import htmlToElement from 'html-to-element'
export default class listcontainer{
    constructor (element) {
        this.$baseElement = element;
        element.appendChild(this._render());


    }

    _render () {
        let listFrame = htmlToElement(`
                                <div class="accordion accordion--fixed accordion--open">
                                    <div class="accordion__head no-arrow">
                                        <div id="searchbar">
                                        </div>
                                    </div>
                                    <div class="accordion__body">
                                        <div id="siteList">
                                        </div>
                                        <div id="showMore">
                                            <div class="flex-container ShowMoreLink">
                                                <a href="#" >Mehr anzeigen</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

        
        
        
        
        `);
        listFrame.querySelector('#showMore').addEventListener("click", this.processUserInput);
        return listFrame;
    }

    listElement(siteId,name,locationId) {
        const element = htmlToElement(`
            <div class="ListItem ListItem--clickable listLinks" id="${siteId}">
                    <div class="ListItem__head">
                        <div style="background:url(https://sub60.tobit.com/l/${locationId})" class="ListItem__Image"> 
                        </div>  
                        <div class="ListItem__Title"> 
                            <p class="ListItem__Title--headline">${name}</p> 
                            <p class="ListItem__Title--description">${siteId}</p>   
                        </div> 
                    </div>  
            </div>       `
            );
        element.addEventListener('click', () => {chayns.openUrlInBrowser('https://chayns.net/'+siteId); });
        return element;
    }
















}