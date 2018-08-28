import htmlToElement from 'html-to-element'
export default class listcontainer {
    constructor (element) {
        this.$baseElement = element;
        element.appendChild(this._render());
        this.lastInputTime = 0;
        this.listLength = 30;
        this.listentries = 0;
        this.lastSearch = "Tobit";
        this.lastInputTime = 0;
        this.newListLength = 20;
        this.resultList = document.querySelector('#siteList');
        this.searchString;
        this.search('Tobit');

    }

    _render () {
        let listFrame = htmlToElement(`
                                <div class="accordion accordion--fixed accordion--open">
                                    <div class="accordion__head no-arrow">
                                        <div id="searchbar">
                                        <div>
                                        <h1>Tapp finder</h1>
                                        <div class="flex-container">
                                            <div class="Suche Suche--accordion searchbar">
                                                <input id="SiteSearch" class="input searchIn" type="text" placeholder="Suche" required>
                                                <i class="fa fa-search searchIcon" aria-hidden="true" id="faSearchIcon"></i>
                                            </div>
                                            </div>
                                        </div>
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
        listFrame.querySelector('#showMore').addEventListener("click", this.enlargeList);
        listFrame.querySelector('#searchbar').onkeyup = () => {this.keyUpSearch(listFrame.querySelector('#SiteSearch').value);};
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



    keyUpSearch = (userinput) => {                        //Hier wird der Zeitpunkt des letzten Keyup-Events gespeichert und die Ausführung geplant
        this.searchString = userinput;
        var millisNow = new Date().getTime();
        this.lastInputTime = millisNow;
        setTimeout(this._timeLockSearch, 500);
    }


    _timeLockSearch = () => {            //Prüfen ob das letzte Event relevant ist
        var millisNow = new Date().getTime();
        var timeDiff = millisNow - this.lastInputTime;
        if (timeDiff > 499) {
            this.lastInputTime = millisNow;      //Erneutes Event angeben um erneute Ausführung zu verhindern
            this.search(this.searchString);                      //Suche ausführen und Seite aktualisieren
        }
    }

    enlargeList = () => {
            chayns.showWaitCursor();            //Wartecursor einblenden
            this.listLength += this.newListLength;
            this._updateSearchData(this.searchString, true);
    }


    search = (forceSearch) => {                     //führt eine durch den Benutzer indizierte Suche aus
        chayns.showWaitCursor();            //Wartecursor einblenden
        if (forceSearch != null) {
            this._updateSearchData(forceSearch);
        } else {
            chayns.hideWaitCursor();
        }
    }

    _updateSearchData = (searchString, enlarge) => {   //searchString enthält Suchstring, 
        let result = this._requery(searchString, enlarge);
        result.then((data) => {
            if (data != null) {
                if (data.Value != null) {
                    this._editList(data, enlarge);            //daten enthält Array mit Daten, enlarge -> HTML-Liste erweitern
                }
            } 
            chayns.hideWaitCursor();            
        }).catch((data) => {
        });
    }



    _requery = (searchString, enlarge) => {
        let startIndex = 0;
        let lengthOfRequest = 0;
        if (!enlarge) {
            lengthOfRequest = this.listLength;
        } else {
            startIndex = this.listLength - this.newListLength;
            lengthOfRequest = this.newListLength;
        }
        return new Promise((resolve) => {
            chayns.findSite(searchString, startIndex, lengthOfRequest).then((data) => {
                resolve(data);
            });
        });
    }


    _editList = (data, enlarge) => {
        if (!enlarge) {                             // If enlarge mode is not enabled a new search is startet so the list has to be cleared
            this.resultList.innerHTML = '';
        }
        if (data != null) {
            data.Value.forEach(resultItem => {
                this.resultList.appendChild(this.listElement(resultItem.siteId,resultItem.appstoreName,resultItem.locationId));
                this.listentries++; 
            });
        }
        chayns.hideWaitCursor();                            //Liste geladen, WaitCursor deaktivieren.
}
}