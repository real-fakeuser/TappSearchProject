import formContainer from './components/formContainer/formContainer';
import listContainer from './components/listContainer/listContainer';

const init = async () => {

      chayns.ready.then(function() {
            console.log('Chayns is ready, environment loaded', chayns.env);
            //############### Form
                  let frmBaseElement = document.querySelector('#addForm');
                  let frmContainer = new formContainer(frmBaseElement);
            //###############
            //############### create wrapper
                  let listBaseElement = document.querySelector('#resultList');
                  let lstContainer = new listContainer(listBaseElement);
            //##############################

          }).catch(function() { 
            console.log('No chayns environment found');
          }).then(function () { 
            console.log('Will always be executed');
          });
          
};
init();
