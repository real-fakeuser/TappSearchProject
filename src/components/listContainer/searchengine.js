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
            console.log("### Search started ###");
            this._search();                      //Suche ausführen und Seite aktualisieren
        }
    }

    _enlargeList = () => {
        if (this._showMoreexec()) {
            listLength += newListLength;
            this._updateData(null,true);
        }
    }


    _search = () => {                     //führt eine durch den Benutzer indizierte Suche aus
        chayns.showWaitCursor();            //Wartecursor einblenden
        var userInput = document.querySelector('#SiteSearch').value;
        if (userInput != null) {        //Bei Benutzereingabe Suche starten
            this._updateData(userInput);
        }    
    }

    _updateData = (searchString, enlarge) => {   //searchString enthält Suchstring, 
        chayns.showWaitCursor();            //Wartecursor einblenden
        if (enlarge) {                              //enlarge = true -> Erweiterungsmodus, nur nachladen
            searchString = this.lastSearch;
        }
        let result = this._requery(searchString, enlarge);
        result.then((data) => {
            if (data != null){
                console.log(data);
            this._editList(data, enlarge);            //daten enthält Array mit Daten, enlarge -> HTML-Liste erweitern
            console.log("marker");

            }/*else{
                chayns.hideWaitCursor();
                _syntaxAlert('Fehler bei der SVGFESpecularLightingElement.', 'Es konnte kein Ergebniss ermittelt werden. Versuche es doch mit einem anderen Suchbegriff oder lade die Seite neu wenn dieser Fehler erneut auftritt.');
            }*/
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
        return new Promise ((resolve) =>
        {
                chayns.findSite(searchString, startIndex, lengthOfRequest).then((data) => {
                    resolve(data);
                });
        });
        this.lastSearch = searchString;  //Den letzten Suchbegriff zwischenspeichern
    }
    _editList = (data, enlarge) => {
        console.log("##############################################################");
        var i = 0;
        if (!enlarge) {
            document.querySelector('#siteList').innerHTML = ""; //Tabelle löschen wenn neue Liste angezeigt wird
        
        }else{
            //i = listLength - newListLength;             //Bei Erweiterung neuen Teil des Arrays anzeigen
        }
        do {
            var $siteId = data.Value[i].siteId;
            var $Name = data.Value[i].appstoreName;
            var $locationId = data.Value[i].locationId;
            //var $htmlListe = "   <div class=\"ListItem ListItem--clickable\">                    <div class=\"listLinks\" id=\""+ $siteId +"\"><div class=\"ListItem__head\"><div style=\"background:url(https://sub60.tobit.com/l/" + $locationId + ")\" class=\"ListItem__Image\">  </div>  <div class=\"ListItem__Title\"> <p class=\"ListItem__Title--headline\">" + $Name + "</p> <p class=\"ListItem__Title--description\">" + $siteId + "</p>   </div>  </div> </div>  </div>";
            var $htmlListe = this.listTemplate.replace("$siteId", $siteId);
                $htmlListe = $htmlListe.replace("$Name",$Name);
                $htmlListe = $htmlListe.replace("$siteId", $siteId);
                $htmlListe = $htmlListe.replace("$siteId", $siteId);

                $htmlListe = $htmlListe.replace("$locationId", $locationId);
            document.querySelector('#siteList').innerHTML += $htmlListe;
            i++;
            this.listentries++;
        } while (data.Value[i] != null)
        chayns.hideWaitCursor();                            //Liste geladen, WaitCursor deaktivieren.
        var resultList = document.getElementsByClassName("listLinks");
        for (var i = 0; i<resultList.length;i++) {
            resultList[i].addEventListener('click', _openUrl);
        }
        return;
    }
    _openUrl = () => {
        var attribute = this.getAttribute("id");
        window.open('https://chayns.net/'+attribute);
    };

    _showMoreexec = () => {
        if (listentries < listLength){
            return false;
        }else{
            return true;
        }
    }










}