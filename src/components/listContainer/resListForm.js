import htmlToElement from 'html-to-element';

export default class resListForm {
    constructor() {}
 
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
