import htmlToElement from 'html-to-element'
export default class Formular {
    constructor(element) 
    {
        this.$baseElement = element;
        element.appendChild(this.render());
    }

    render = () =>{

        let inputFRM = htmlToElement(`
                            <div class="accordion">
                                <div class="accordion__head">Füge Deine eigene Site hinzu </div>
                                <div class="accordion__body">
                                    <!--<div class="accordion__intro">Here is the accordion intro.</div>-->
                                    <div class="accordion__content">
                                        <div class="Formular">
                                            <div class="Formularcontent">
                                                <input type="text" class="input forminput" id="frmName" placeholder="Name">
                                            </div>
                                            <div class="Formularcontent">
                                                <input type="text" class="input forminput" id="frmAddress" placeholder="Post-Adresse">
                                            </div>
                                            <div class="Formularcontent">
                                                    <input type="text" class="input forminput" id="frmMailAddr" placeholder="eMailadresse">
                                            </div>
                                            <div class="Formularcontent">
                                                    <input type="text" class="input forminput" id="frmComment" placeholder="Kommentar">
                                            </div>
                                            <div id="submitButton">
                                                <div style="text-align: center">
                                                    <button class="button" id="sendForm">Daten absenden</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                    `);

        inputFRM.querySelector('#submitButton').addEventListener("click", this.processUserInput);
                    
        return inputFRM;
    }

_get = () => {
        let myData = {
            name: (this.$baseElement.querySelector('#frmName').value),
            address:this.$baseElement.querySelector('#frmAddress').value,
            eMailAddr:this.$baseElement.querySelector('#frmMailAddr').value,
            comment:this.$baseElement.querySelector('#frmComment').value
        }
        return myData;
}

_setFrm = () => {
        this.$baseElement.querySelector('#frmName').value           = '';
        this.$baseElement.querySelector('#frmAddress').value        = '';
        this.$baseElement.querySelector('#frmMailAddr').value       = '';
        this.$baseElement.querySelector('#frmComment').value        = '';
}

containsData = (data) => {
    if (data !== "") {
        return true;
    } else {
        return false;
    }
}

eMailValid = (mail) => {
    return(mail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
}

    _getFormData = () => {
        //Hier wird der Inhalt des Formulars geholt, geprüft und zum versenden übergeben.
        let data = this._get();
        if (data != null) {
            let bvalid = true;
            data.forEach(eachvalue => {             //Jedes Feld auf Inhalt prüfen
                if(!this.containsData(data[eachvalue])) {
                    bvalid = false;
                }
            });

            if (bvalid) {                                           //Bei Input email prüfen
                if (this.eMailValid(data["eMailAddr"])) {
                   return data;
                } else {
                    chayns.dialog.alert("Fehler", "Gebe bitte Deine e-Mail Adresse ein.");
                }
            } else {
                chayns.dialog.alert("Fehler", "Fülle bitte alle Felder aus.");
            }
        }
    }

    processUserInput = () => {
        let userInput = this._getFormData();
        if (userInput != null) {
            this._send(userInput);
        }
    }

    _send = (data) => {
        //Hier wird das Formular versendet
        var messageToSend = ('Anfrage Seite indizieren: \nName: ' + data["name"] + '\nAdresse: ' + data["address"] + '\neMail Adresse:' + data["eMailAddr"] + '\nKommentar: ' + data["comment"]);
                chayns.intercom.sendMessageToPage({
                    text: messageToSend
                }).then((data) => {            
                    if(data.status == 200){
                        this._setFrm();
                        chayns.dialog.alert(chayns.env.user.name + ', Deine Anfrage wurde gesendet. \nVielen Dank für die Nachfrage!');
                    }
                });
                return true;
    }
}
