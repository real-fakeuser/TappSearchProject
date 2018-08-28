import frmAccess from './getUserInput';
import checkInput from './chkInput';
export default class frmLogic {
    constructor() {}

    _getFormData = () => {
        //Hier wird der Inhalt des Formulars geholt, geprüft und zum versenden übergeben.
        let objgetFrm = new frmAccess;           //Gibt den Inhalt des Formulars zurück.
        let data = objgetFrm.get();

        let objchkInput = new checkInput;
        if (data != null) {
            let bvalid = true;
            data.forEach(eachvalue => {             //Jedes Feld auf Inhalt prüfen
                if(!objchkInput.containsData(data[eachvalue])) {
                    bvalid = false;
                }
            });

            if (bvalid) {                                           //Bei Input email prüfen
                if (objchkInput.eMailValid(data["eMailAddr"])) {
                    if (this._send(data)) {
                        return data;
                    } else {
                        this._popupMessage("Fehler", "Senden fehlgeschlagen. Versuche es später bitte erneut.");
                    }
                } else {
                    this._popupMessage("Fehler", "Gebe bitte Deine e-Mail Adresse ein.");
                }
            } else {
                this._popupMessage("Fehler", "Fülle bitte alle Felder aus.");
            }
        }
    }

    processUserInput = () => {
        let userInput = this._getFormData();
        if (userInput != null) {
            this._send(userInput());
        }
    }

    _send = (data) => {
        //Hier wird das Formular versendet
        var messageToSend = ('Anfrage Seite indizieren: \nName: ' + data["name"] + '\nAdresse: ' + data["address"] + '\neMail Adresse:' + data["eMailAddr"] + '\nKommentar: ' + data["comment"]);
                chayns.intercom.sendMessageToPage({
                    text: messageToSend
                }).then(function(data){            
                    if(data.status == 200){
                    let objRemoveFRM = new frmAccess;           //Setzt den Inhalt des Formulars zurück.
                    objRemoveFRM.set();
                    chayns.dialog.alert(chayns.env.user.name + ', Deine Anfrage wurde gesendet. \nVielen Dank für die Nachfrage!');
                    }
                });
                return true;
    }

    _popupMessage = (heading, content) => {
        chayns.dialog.alert(heading, content)
            .then(function (data) { 
        });
    }





















}