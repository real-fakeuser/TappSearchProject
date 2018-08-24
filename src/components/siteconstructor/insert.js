import Formular from '../accordionElements/accordionFormular';
import siteList from '../accordionElements/accordionList';


let objAddFrm = new Formular();
console.log(objAddFrm.collapsedfrm());
document.querySelector('#addForm').appendChild(objAddFrm.collapsedfrm());

let objAddList = new siteList();
console.log(objAddList.accList());

document.querySelector('#resultList').appendChild(objAddList.accList());
