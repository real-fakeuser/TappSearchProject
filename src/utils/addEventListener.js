

//document.querySelector('#SiteSearch').onkeyup = _keyUpSearch();
//document.querySelector('#showMore').addEventListener("click", _enlargeList());


import frmLogic from '../components/formContainer/sendFrm';
let objfrmLogic = new frmLogic;
document.querySelector('#sendForm').addEventListener("click", objfrmLogic.processUserInput);
