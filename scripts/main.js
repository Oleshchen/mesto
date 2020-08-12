let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__info-button');
let popupCloseButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_profession');
let infoName = document.querySelector('.profile__info-name');
let profession = document.querySelector('.profile__profession');

let popupTogle = function() {
  popup.classList.toggle ('popup_visibility');
  jobInput.value = '';
  nameInput.value = '';
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  infoName.textContent = nameInputValue;
  profession.textContent = jobInputValue;

  popup.classList.remove('popup_visibility');
}
popupOpenButton.addEventListener('click', popupTogle);
popupCloseButton.addEventListener('click', popupTogle);
popup.addEventListener('submit', formSubmitHandler);  