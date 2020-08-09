let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__info-button');
let popupCloseButton = popup.querySelector('.popup__close-button');

let popupTogle = function() {
  popup.classList.toggle ('popup_visibility');
}

popupOpenButton.addEventListener('click', popupTogle);
popupCloseButton.addEventListener('click', popupTogle);

function formSubmitHandler (evt) {
  evt.preventDefault(); 
    
  let nameInput = popup.querySelector('.popup__name');
  let jobInput = popup.querySelector('.popup__profession');

  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;

  let infoName = document.querySelector('.profile__info-name');
  let profession = document.querySelector('.profile__profession');

  infoName.textContent = nameInputValue;
  profession.textContent = jobInputValue;
  popup.classList.remove('popup_visibility');

}
popup.addEventListener('submit', formSubmitHandler);  