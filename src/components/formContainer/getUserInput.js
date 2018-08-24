export default class getUserInput {
    constructor() {}

    get = () => {

        let data = ['name' , 'address' , 'eMailAddr' ,  'comment'];
        data['name']        =   document.querySelector('#frmName').value;
        data['address']     =   document.querySelector('#frmAddress').value;
        data['eMailAddr']     =   document.querySelector('#frmMailAddr').value;
        data['comment']     =   document.querySelector('#frmComment').value;
        
        return data;
    }
}