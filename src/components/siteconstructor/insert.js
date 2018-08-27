import Formular from '../accordionElements/accordionFormular';


let objAddFrm = new Formular();
console.log(objAddFrm.collapsedfrm());
document.querySelector('#addForm').appendChild(objAddFrm.collapsedfrm());

