export default class searchEngine {
    constructor() {
        this.lastInputTime = 0;
        this.listTemplate = `
        <div class="ListItem ListItem--clickable" id="$siteId">
            <div class="listLinks" id="$siteId">
                <div class="ListItem__head">
                    <div style="background:url(https://sub60.tobit.com/l/$locationId)" class="ListItem__Image"> 
                    </div>  
                    <div class="ListItem__Title"> 
                        <p class="ListItem__Title--headline">$Name</p> 
                        <p class="ListItem__Title--description">$siteId</p>   
                    </div> 
                </div>  
            </div>
        </div>`;
        this.listLength = 30;
        this.listentries = 0;
        this.lastSearch = "Tobit";
        this.lastInputTime = 0;
        this.newListLength = 20;
    
    }

    

    
    keyUpSearch = () => {                        //Hier wird der Zeitpunkt des letzten Keyup-Events gespeichert und die Ausführung geplant
        var millisNow = new Date().getTime();
        this.lastInputTime = millisNow;
        setTimeout(this._timeLockSearch,500);
    }


    _timeLockSearch = () => {            //Prüfen ob das letzte Event relevant ist
        var millisNow = new Date().getTime();
        var timeDiff = millisNow - this.lastInputTime;
        if (timeDiff > 499){        
            this.lastInputTime = millisNow;      //Erneutes Event angeben um erneute Ausführung zu verhindern
            this.search();                      //Suche ausführen und Seite aktualisieren
        }
    }

    enlargeList = () => {
        console.log("Mehr anzeigen Button gedrückt.");

        if (this._showMoreexec) {
            this.listLength += this.newListLength;
            this._updateSearchData(null,true);
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
            if (data != null){
                console.log(data);
            this._editList(data, enlarge);            //daten enthält Array mit Daten, enlarge -> HTML-Liste erweitern
            }
        }).catch((data) => {
        });
    }



    _requery = (searchString, enlarge) => {
        let startIndex = 0;
        let lengthOfRequest = 0;

        if (!enlarge) {
            lengthOfRequest = this.listLength;
        }else{
            startIndex = this.listLength - this.newListLength;
            lengthOfRequest = this.newListLength;
        }
            searchString = document.querySelector('#SiteSearch').value;
        

        return new Promise ((resolve) =>
        {
                chayns.findSite(searchString, startIndex, lengthOfRequest).then((data) => {
                    console.log(searchString + startIndex + lengthOfRequest);
                    resolve(data);
                });
        });
    }

    
    _editList = (data, enlarge) => {
        var i = 0;
        if (!enlarge) {
            document.querySelector('#siteList').innerHTML = ""; //Tabelle löschen wenn neue Liste angezeigt wird
        
        }
        do {
            var $siteId = data.Value[i].siteId;
            var $Name = data.Value[i].appstoreName;
            var $locationId = data.Value[i].locationId;
            var $htmlListe = this.listTemplate.replace("$siteId", $siteId);
                $htmlListe = $htmlListe.replace("$Name",$Name);
                $htmlListe = $htmlListe.replace("$siteId", $siteId);
                $htmlListe = $htmlListe.replace("$siteId", $siteId);

                $htmlListe = $htmlListe.replace("$locationId", $locationId);
            document.querySelector('#siteList').innerHTML += $htmlListe;
            //document.getElementById($siteId).addEventListener('click', this._openUrl($siteId));
            document.getElementById($siteId).addEventListener('click', () => {
                window.open('https://chayns.net/'+siteId);
                console.log("Element gedrückt");
            });
            i++;
            this.listentries++;
        } while (data.Value[i] != null)
        chayns.hideWaitCursor();                            //Liste geladen, WaitCursor deaktivieren.
        
        return;
    }
    _openUrl = (attribute) => {
        let siteId = attribute.originalTarget.innerHTML;
        window.open('https://chayns.net/'+siteId);
    };

    _showMoreexec = () => {
        if (this.listentries < this.listLength){
            return false;
        }else{
            return true;
        }
    }










}