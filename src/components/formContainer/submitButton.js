import htmlToElement from 'html-to-element'
import sendFrm from './sendFrm';


export default class button {
    constructor() {}

    submitButton = () =>{
        let btn = htmlToElement(`
                                <div style="text-align: center">
                                    <button class="button" id="sendForm">Daten absenden</button>
                                </div>
                               `);
        btn.addEventListener("click", new sendFrm().processUserInput);
        return btn;
    }
}