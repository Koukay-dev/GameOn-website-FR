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
function closeModal() {
  modalbg.style.display = "none";
}

// Fonction validation
function validate(){
  var firstName = document.getElementById('first');
  var lastName = document.getElementById('last');
  var email = document.getElementById('email');
  var birthdate = document.getElementById('birthdate');
  var quantity = document.getElementById('quantity');
  var location = document.querySelector('input[name="location"]');
  var checkbox1 = document.getElementById('checkbox1');

  
  if (
    validateText(firstName) &&
    validateText(lastName) &&
    validateEmail(email) &&
    validateBirthdate(birthdate) &&
    validateQuantity(quantity) &&
    validateCheckbox(location) &&
    validateCheckbox(checkbox1)
    ){
    validationMsg(true);
    setTimeout(closeModal, 2500);  
  }

  
}


function validationMsg(){
  const validateMsg = document.getElementById('on-top-message');
  const validateMsgText = document.getElementById('on-top-message-text');
  validateMsgText.innerText = "Merci ! Votre réservation a été reçue."
  validateMsgText.style.backgroundColor = '#06a606';
  validateMsg.style.display = 'block';
}

/**
 * Fonction qui fait apparaitre un message d'erreur sous l'élément du DOM en paramêtre,
 * ne rien mettre en message équivaut à dire qu'il n'y a pas d'erreur 
 * @param {string} msg 
 */
function showValidity(DOMelement , msg = ''){
    DOMelement.setCustomValidity(msg);
    DOMelement.reportValidity();
}


function validateText(DOMelement){
  const regexTest = '/^[a-zA-Z-]{2,}$/';
  if (DOMelement.innerText.test(regexTest)){
    showValidity(DOMelement);
    return true;
  }
  showValidity(DOMelement, 'Veuillez entrer 2 caractères valides (caractères alphabétique et tirets autorisés) ou plus pour le champ du nom.')
  return false;
  
}

function validateEmail(DOMelement){
  const emailRegex = '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$';

  if (DOMelement.innerText.test(emailRegex)){
    showValidity(DOMelement);
    return true;
  }
  showValidity(DOMelement, 'Veuillez entrer un email valide.');
  return false;
  
}

function validateQuantity(DOMelement) {
  var quantity = DOMelement.value;
  if (quantity < 0 || quantity > 99) {
    showValidity(DOMelement,'Veuillez entrer un nombre entre 0 et 99 pour le nombre de tournois.');
      return false;
  }
  showValidity(DOMelement);
  return true;
}


function validateBirthdate(DOMelement) {
  var birthdateInput = DOMelement.value;

  var birthdate = new Date(birthdateInput.value);
  var currentDate = new Date();

  if (birthdateInput.value === '' || (birthdate > currentDate)) {
    showValidity(DOMelement,'Vous devez entrer votre date de naissance.');
    return false;
  }
  showValidity(DOMelement);
  return true;
}


function validateCheckbox(DOMelement){
  
  const checked = () => {
    showValidity(DOMelement);
    return true;
  };
  
  if(Array.isArray(DOMelement)){
    DOMelement.forEach((elem) => {
      if(elem.checked){ // Si il y a au moins un élément qui est checked
        return checked;
      }
    });
    showValidity(DOMelement[0], "Vous devez choisir une option.");
    return false;

  } else {

    if(DOMelement.checked){
      return checked;
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
  event.preventDefault();
  validate();
})

