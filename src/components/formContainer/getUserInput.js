export default class frmAccess {
    constructor() {
        this.field = ['name', 'address', 'eMailAddr', 'comment'];
        this.field['name']        = document.querySelector('#frmName');
        this.field['address']     = document.querySelector('#frmAddress');
        this.field['eMailAddr']   = document.querySelector('#frmMailAddr');
        this.field['comment']     = document.querySelector('#frmComment');
        
    }

    get = () => {

        let data = ['name' , 'address' , 'eMailAddr' ,  'comment'];
        data['name']        =   this.field['name'].value;
        data['address']     =   this.field['address'].value;
        data['eMailAddr']   =   this.field['eMailAddr'].value;
        data['comment']     =   this.field['comment'].value;
        
        return data;
    }

    set = () => {
        this.field.forEach(element => {
            this.field[element].value = '';
        });
    }
}