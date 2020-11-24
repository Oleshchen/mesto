import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

const popupMain = document.querySelector('.popup');
const popupEditorForm = document.querySelector('.popup_profile-edit');
const popupElementAddForm = document.querySelector('.popup_image-add'); 
const popupOpenButton = document.querySelector('.profile__info-button');
const popupViewerOpen = document.querySelector('.popup_viewer');
const popupCloseButtonProfile = document.querySelector('.popup__close-button-profile');
const popupCloseButtonElement = document.querySelector('.popup__close-button-element');
const popupCloseButtonImageView = document.querySelector('.popup__close-button-image');
const nameInput = popupMain.querySelector('.popup__input_name');
const jobInput = popupMain.querySelector('.popup__input_profession');
const mestoInputName = document.querySelector('.popup__input_image-name');
const mestoInputSrc = document.querySelector('.popup__input_image-src');
const infoName = document.querySelector('.profile__info-name');
const profession = document.querySelector('.profile__profession');
const elementsContainer = document.querySelector('.elements');
const elementAddButton = document.querySelector('.profile__add-button ');
const popupForm = popupElementAddForm.querySelector('.popup__form');
const submitButtonPopupElement = document.querySelector('.popup__save-button-element');

const formData = {
  formSelector: 'popup__form',
  inputSelector: '.popup__input',
  submitButtonProfile: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_hidden'
}

const userForm = new FormValidator(formData, popupEditorForm);

function evtListener(pop) {
  if (pop.classList.contains('popup_visibility')) {
    document.addEventListener('keydown', keyEventSwitch);
    
  }
  else {
    document.removeEventListener('keydown', keyEventSwitch);
    pop.removeEventListener('mousedown', popupOverlayClose);
  }

}

const keyEventSwitch = (event) => {
  if(event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_visibility');
    popupTogle(popupOpened);
  }
}

function popupOverlayClose(pop) {
  pop.addEventListener('mousedown', (event) => {
    if(event.target === event.currentTarget) {
      popupTogle(pop);
    }
  });
}

function popupTogle(pop) {
  pop.classList.toggle ('popup_visibility');
  popupOverlayClose(pop);
  evtListener(pop);
}

function formSubmitProfile (event) {
  event.preventDefault();
  infoName.textContent = nameInput.value;
  profession.textContent = jobInput.value;
  popupTogle(popupEditorForm);
}

popupOpenButton.addEventListener('click', () => {
  jobInput.value = profession.textContent;
  nameInput.value = infoName.textContent;
  userForm.enableValidation();
  popupTogle(popupEditorForm);
});

popupEditorForm.addEventListener('submit', formSubmitProfile);
popupElementAddForm.addEventListener('submit', formSubmitElement);

const elementForm = new FormValidator(formData, popupElementAddForm);


elementAddButton.addEventListener('click',  () => {
  elementForm.enableValidation(); 
  popupTogle(popupElementAddForm);
  submitButtonPopupElement.classList.add('popup__save-button_disabled');
  submitButtonPopupElement.disabled = true;
  

}); 

// закрытие popup редактирования profile
popupCloseButtonProfile.addEventListener('click', () => {
  popupTogle(popupEditorForm);
});

// закрытие popup редактирования карточки
popupCloseButtonElement.addEventListener('click', () => {
  popupForm.reset();
  popupTogle(popupElementAddForm);
});

// закрытие popup просмотра изображения
popupCloseButtonImageView.addEventListener('click', () => {
    popupTogle(popupViewerOpen);
});

function formSubmitElement (event) {
  event.preventDefault();
  const newCard = new Card({name: `${mestoInputName.value}`, link: `${mestoInputSrc.value}`}, '#cardTemplate', popupTogle, popupViewerOpen);

  elementsContainer.prepend(newCard.generateElement());
  popupForm.reset();
  popupTogle(popupElementAddForm);
}  

submitButtonPopupElement.addEventListener('submit', formSubmitElement);

initialCards.forEach((item) => {
  const createCard = (item) => {
    return new Card(item, '#cardTemplate', popupTogle, popupViewerOpen);
  }
  const cardElement = createCard(item).generateElement();
  elementsContainer.append(cardElement);

});