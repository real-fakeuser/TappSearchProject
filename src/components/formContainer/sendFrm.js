import getUserInput from './getUserInput';
import checkInput from './chkInput';
export default class frmLogic {
    constructor() {}

    processUserInput = () => {
        //Hier wird der Inhalt des Formulars geholt, geprüft und zum versenden übergeben.
    console.log("Daten absenden Button gedrückt.");
        let objgetFrm = new getUserInput;           //Gibt den Inhalt des Formulars zurück.
        let data = objgetFrm.get();
        console.log(data);

        let objchkInput = new checkInput;
        if (data != null) {
            console.log(objchkInput.containsData(data));


        }




    }

    send = () => {
        //Hier wird das Formular versendet

    }























}