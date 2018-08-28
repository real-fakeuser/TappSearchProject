import htmlToElement from 'html-to-element';
import resListForm from './resListForm';

export default class searchEngine {
    constructor() {
        this.objResList = new resListForm();
        this.lastInputTime = 0;
        this.listLength = 30;
        this.listentries = 0;
        this.lastSearch = "Tobit";
        this.lastInputTime = 0;
        this.newListLength = 20;
        this.resultList = document.querySelector('#siteList');
    }

    keyUpSearch = () => {                        //Hier wird der Zeitpunkt des letzten Keyup-Events gespeichert und die Ausführung geplant
        var millisNow = new Date().getTime();
        this.lastInputTime = millisNow;
        setTimeout(this._timeLockSearch, 500);
    }


    _timeLockSearch = () => {            //Prüfen ob das letzte Event relevant ist
        var millisNow = new Date().getTime();
        var timeDiff = millisNow - this.lastInputTime;
        if (timeDiff > 499) {
            this.lastInputTime = millisNow;      //Erneutes Event angeben um erneute Ausführung zu verhindern
            this.search();                      //Suche ausführen und Seite aktualisieren
        }
    }

    enlargeList = () => {
        if (this._showMoreexec) {
            this.listLength += this.newListLength;
            this._updateSearchData(null, true);
        }
    }


    search = (searchStringLocal) => {                     //führt eine durch den Benutzer indizierte Suche aus
        chayns.showWaitCursor();            //Wartecursor einblenden
        var userInput = document.querySelector('#SiteSearch').value;
        if (userInput != null) {        //Bei Benutzereingabe Suche starten
            searchStringLocal = userInput;
            this._updateSearchData(searchStringLocal);
        }
    }

    _updateSearchData = (searchString, enlarge) => {   //searchString enthält Suchstring, 
        chayns.showWaitCursor();            //Wartecursor einblenden
        if (enlarge) {                              //enlarge = true -> Erweiterungsmodus, nur nachladen
            searchString = this.lastSearch;
        }
        let result = this._requery(searchString, enlarge);
        result.then((data) => {
            if (data != null) {
                this._editList(data, enlarge);            //daten enthält Array mit Daten, enlarge -> HTML-Liste erweitern
            } else {
                chayns.hideWaitCursor();
            }
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
        searchString = document.querySelector('#SiteSearch').value;


        return new Promise((resolve) => {
            chayns.findSite(searchString, startIndex, lengthOfRequest).then((data) => {
                resolve(data);
            });
        });
    }


    _editList = (data, enlarge) => {
        var i = 0;
        if (!enlarge) {                             // If enlarge mode is not enabled a new search is startet so the list has to be cleared
            this.resultList.innerHTML = '';
        }
        
        if (data != null) {
            data.Value.forEach(resultItem => {
                this.resultList.appendChild(this.objResList.listElement(resultItem.siteId,resultItem.appstoreName,resultItem.locationId));
                this.listentries++; 
            });
        }
        chayns.hideWaitCursor();                            //Liste geladen, WaitCursor deaktivieren.
    }
    _showMoreexec = () => {
        if (this.listentries < this.listLength) {
            return false;
        } else {
            return true;
        }
    }










}