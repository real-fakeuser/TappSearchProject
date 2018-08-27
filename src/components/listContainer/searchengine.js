export default class searchEngine {
    constructor() {
        this.lastInputTime = 0;

    }

    

    
    keyUpSearch = () => {                        //Hier wird der Zeitpunkt des letzten Keyup-Events gespeichert und die Ausführung geplant
        var millisNow = new Date().getTime();
        this.lastInputTime = millisNow;
        setTimeout(this.timeLockSearch,500);
    }


    timeLockSearch = () => {            //Prüfen ob das letzte Event relevant ist
        var millisNow = new Date().getTime();
        var timeDiff = millisNow - this.lastInputTime;
        if (timeDiff > 499){        
            this.lastInputTime = millisNow;      //Erneutes Event angeben um erneute Ausführung zu verhindern
            console.log("### Search started ###");
           // _search();                      //Suche ausführen und Seite aktualisieren
        }
    }



    executeSearch = () => {

    }
}