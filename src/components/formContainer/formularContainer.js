import htmlToElement from 'html-to-element'
export default class Formular {
    constructor() {}

    collapsedfrm = () =>{

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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                    `);
        return inputFRM;
    }
}