export default class checkInput {
    constructor() {}

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


}