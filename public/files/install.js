'use strict';

let deferredInstallPrompt = null;                                                  //definición de vaiable 

const installButton = document.getElementById('butInstall');                       //constante de acceso al nodo       
installButton.addEventListener('click', installPWA);                              //se atrapa el evento y se llama función


window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);


function saveBeforeInstallPromptEvent(evt) {

  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
}



function installPWA(evt) {
 
  deferredInstallPrompt.prompt();
 
  evt.srcElement.setAttribute('hidden', true);
 
  deferredInstallPrompt.userChoice
      .then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('Aceptado');
        } else {
          console.log('Rechazado');
        }
        deferredInstallPrompt = null;
      });
}


window.addEventListener('appinstalled', logAppInstalled);


function logAppInstalled(evt) {

  console.log('Juego instalado.');

}
