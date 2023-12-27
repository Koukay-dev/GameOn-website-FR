import Annotation from './annotation.class.js';

// ========== Fonction ========== 


function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  const validateMsg = document.getElementById('on-top-message');
  validateMsg.style.display = 'none';
}

// launch modal form
function closeModal(callback) {
  modalbg.style.display = "none";
  if(callback !== null){
    callback();
  }
}

// Fonction validation
function validate(form){

  var firstName = validateText(document.getElementById('first'));
  var lastName = validateText(document.getElementById('last'));
  var email = validateEmail(document.getElementById('email'));
  var birthdate = validateBirthdate(document.getElementById('birthdate'));
  var quantity = validateQuantity(document.getElementById('quantity'));
  var location = validateCheckbox(Array.from(document.querySelectorAll('input[name="location"]')));
  var checkbox1 = validateCheckbox(document.getElementById('checkbox1'));

  console.log('validate');
  
  if (firstName && lastName && email && birthdate && quantity && location && checkbox1){
    validationMsg(form);
    return true;
  }

  console.log('erreur');
  
  return false;
}



function validationMsg(form){
  const validateMsg = document.getElementById('on-top-message');
  validateMsg.style.display = 'flex';
  validateMsg.querySelectorAll('.validateByClosing').forEach((elem)=>{
    elem.addEventListener('click',() => {
      closeModal(form.reset())
      validateMsg.style.display = 'none';
    });
  });

 
}

/**
 * Fonction qui fait apparaitre un message d'erreur sous l'élément du DOM en paramêtre,
 * ne rien mettre en message équivaut à dire qu'il n'y a pas d'erreur 
 * @param {string} msg 
 */
function showValidity(DOMelement , msg = ''){

    const newAnnot = new Annotation(DOMelement, msg);
    newAnnot.isError();
    newAnnot.show();

    document.body.addEventListener('click', () =>{
      newAnnot.hide()
    });
    
}


function validateText(DOMelement){
  const regexTest = /^[a-zA-Z-]{2,}$/;
  if (regexTest.test(DOMelement.value)){
    return true;
  }
  showValidity(DOMelement, 'Veuillez entrer 2 caractères valides (caractères alphabétique et tirets autorisés) ou plus pour le champ du nom.')
  return false;
  
}

function validateEmail(DOMelement){
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (emailRegex.test(DOMelement.value)){
    return true;
  }
  showValidity(DOMelement, 'Veuillez entrer un email valide.');
  return false;
  
}

function validateQuantity(DOMelement) {
  var quantity = DOMelement.value;
  if (quantity < 0 || quantity > 99 || quantity === '') {
    showValidity(DOMelement,'Veuillez entrer un nombre entre 0 et 99 pour le nombre de tournois.');
      return false;
  }
  
  return true;
}


function validateBirthdate(DOMelement) {
  var birthdateInput = DOMelement.value;

  var birthdate = new Date(birthdateInput);
  var currentDate = new Date();

  if (birthdateInput === '' || birthdate > currentDate) {
    showValidity(DOMelement,'Vous devez entrer votre date de naissance.');
    return false;
  }
  
  return true;
}


function validateCheckbox(DOMelement){
  
  var validCheckbox = false;

  if(Array.isArray(DOMelement)){
    DOMelement.forEach((elem) => {
      if(elem.checked){ // Si il y a au moins un élément qui est checked
        validCheckbox = true;
      }
    });
    if (validCheckbox){
      return true;
    }
    // Pour cibler le label 
    var dernierElement = DOMelement[DOMelement.length - 1];
    var prochainElement = dernierElement.nextElementSibling;

    if (prochainElement) {
      showValidity(prochainElement , "Vous devez choisir une option.");
    } else {
      showValidity(dernierElement , "Vous devez choisir une option.");

    }
    //showValidity(DOMelement[DOMelement.length - 1] , "Vous devez choisir une option.");
    return false;

  } else {

    if(DOMelement.checked){
      return true;
    }
  }

  showValidity(DOMelement.nextElementSibling, "Vous devez vérifier que vous acceptez les termes et conditions.");
  return false;
}

// ========== Fonction ========== 













// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formReserve = document.getElementById("form-reserve");
const modalCloseBtns= document.querySelectorAll(".close");
const btnNav = document.getElementById('btnNav');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

modalCloseBtns.forEach( (element) => {
  element.addEventListener('click', closeModal)
});

btnNav.addEventListener('click',editNav);

formReserve.addEventListener('submit', (event) => {
  console.log('submit');
  event.preventDefault()
  validate(formReserve);
});

