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
}

// launch modal form
function closeModal(callback) {
  modalbg.style.display = "none";
  if(callback !== null){
    callback();
  }
}

// Fonction validation
function validate(event){
  var firstName = document.getElementById('first');
  var lastName = document.getElementById('last');
  var email = document.getElementById('email');
  var birthdate = document.getElementById('birthdate');
  var quantity = document.getElementById('quantity');
  var location = document.querySelector('input[name="location"]');
  var checkbox1 = document.getElementById('checkbox1');

  console.log('validate');
  
  if (  validateText(firstName) &&
        validateText(lastName) &&
        validateEmail(email) &&
        validateBirthdate(birthdate) &&
        validateQuantity(quantity) &&
        validateCheckbox(location) &&
        validateCheckbox(checkbox1)
      ){
        validationMsg(event);
        return true;
  }

  console.log('erreur');
  event.preventDefault();
  return false;
}



function validationMsg(event){
  const validateMsg = document.getElementById('on-top-message');
  validateMsg.querySelectorAll('.validateByClosing').forEach((elem)=>{
    elem.addEventListener('click', closeModal(event.submit()))
  });

  validateMsg.style.display = 'flex';
}

/**
 * Fonction qui fait apparaitre un message d'erreur sous l'élément du DOM en paramêtre,
 * ne rien mettre en message équivaut à dire qu'il n'y a pas d'erreur 
 * @param {string} msg 
 */
function showValidity(DOMelement , msg = ''){
    console.log(msg);
    console.log(DOMelement);
    DOMelement.setCustomValidity(msg);
    DOMelement.reportValidity();
    
}


function validateText(DOMelement){
  const regexTest = /^[a-zA-Z-]{2,}$/;
  if (regexTest.test(DOMelement.value)){
    showValidity(DOMelement);
    return true;
  }
  showValidity(DOMelement, 'Veuillez entrer 2 caractères valides (caractères alphabétique et tirets autorisés) ou plus pour le champ du nom.')
  return false;
  
}

function validateEmail(DOMelement){
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (emailRegex.test(DOMelement.value)){
    showValidity(DOMelement);
    return true;
  }
  showValidity(DOMelement, 'Veuillez entrer un email valide.');
  return false;
  
}

function validateQuantity(DOMelement) {
  var quantity = DOMelement.value;
  console.log(quantity);
  if (quantity < 0 || quantity > 99) {
    showValidity(DOMelement,'Veuillez entrer un nombre entre 0 et 99 pour le nombre de tournois.');
      return false;
  }
  showValidity(DOMelement);
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
  showValidity(DOMelement);
  return true;
}


function validateCheckbox(DOMelement){
  
  const checked = (elem) => {
    showValidity(elem);
    return true;
  };
  
  if(Array.isArray(DOMelement)){
    DOMelement.forEach((elem) => {
      if(elem.checked){ // Si il y a au moins un élément qui est checked
        return checked(elem);
      }
    });
    showValidity(DOMelement[0], "Vous devez choisir une option.");
    return false;

  } else {

    if(DOMelement.checked){
      return checked(DOMelement);
    }
  }

  showValidity(DOMelement, "Vous devez vérifier que vous acceptez les termes et conditions.");
  return false;
}




















// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formReserve = document.getElementById("form-reserve");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

modalCloseBtn.addEventListener('click', closeModal);

formReserve.addEventListener('submit', (event) => {
  console.log('submit');
  validate(event);
});




// Sélectionnez tous les divs avec la classe "formData"
var divsFormData = document.querySelectorAll('.formData');
var everyInputs = [];
divsFormData.forEach(function(div) {
    var inputsDansDiv = div.querySelectorAll('input');
    inputsDansDiv.forEach(function(input) {
        everyInputs.push(input);
    });
});

everyInputs.forEach((input) => {
  input.addEventListener('input', () => {
    showValidity(input);  // Permet pour chaque input si il y a eu une erreur de remettre l'état à 0 dès qu'il y a un changement
  })
});

