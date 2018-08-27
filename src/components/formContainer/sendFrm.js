import getUserInput from './getUserInput';
import checkInput from './chkInput';
export default class frmLogic {
    constructor() {}

    processUserInput = () => {
        //Hier wird der Inhalt des Formulars geholt, geprüft und zum versenden übergeben.
        let objgetFrm = new getUserInput;           //Gibt den Inhalt des Formulars zurück.
        let data = objgetFrm.get();
        //console.log(data);

        let objchkInput = new checkInput;
        if (data != null) {
            let bvalid = true;
            data.forEach(eachvalue => {
                console.log(data[eachvalue]);
                if(!objchkInput.containsData(data[eachvalue])) {
                    bvalid = false;
                }
            });
            console.log(bvalid);
            //console.log(objchkInput.containsData(data))   ;
            if (objchkInput.containsData(data) != false) {
                //console .log("Daten richtig!");
            } else {
                //console.log("Fehler bei der Datenverarbeitung");
            }


        }




    }

    send = () => {
        //Hier wird das Formular versendet

    }























}