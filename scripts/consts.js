const imageSource = document.querySelector('.popup__full-image');
const imageName = document.querySelector('.popup__viewer-text'); 

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

const popupEditorForm = document.querySelector('.popup_profile-edit');
const popupElementAddForm = document.querySelector('.popup_image-add'); 
const popupOpenButton = document.querySelector('.profile__info-button');
const popupViewerOpen = document.querySelector('.popup_viewer');
const popupCloseButtonProfile = document.querySelector('.popup__close-button-profile');
const popupCloseButtonElement = document.querySelector('.popup__close-button-element');
const popupCloseButtonImageView = document.querySelector('.popup__close-button-image');
const nameInput = popupEditorForm.querySelector('.popup__input_name');
const jobInput = popupEditorForm.querySelector('.popup__input_profession');
const mestoInputName = document.querySelector('.popup__input_image-name');
const mestoInputSrc = document.querySelector('.popup__input_image-src');
const infoName = document.querySelector('.profile__info-name');
const profession = document.querySelector('.profile__profession');
const elementsContainer = document.querySelector('.elements');
const elementAddButton = document.querySelector('.profile__add-button ');
const popupFormElementAdd = popupElementAddForm.querySelector('.popup__form');
const submitButtonPopupElement = document.querySelector('.popup__save-button-element');

const formData = {
  formSelector: 'popup__form',
  inputSelector: '.popup__input',
  submitButtonProfile: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_hidden',
  inputSpanError: '.popup__error'
}

export {
  imageName,
  imageSource,
  initialCards,
  popupEditorForm,
  popupElementAddForm,
  popupOpenButton,
  popupViewerOpen,
  popupCloseButtonProfile,
  popupCloseButtonElement,
  popupCloseButtonImageView,
  nameInput,
  jobInput,
  mestoInputName,
  mestoInputSrc,
  infoName,
  profession,
  elementsContainer,
  elementAddButton,
  popupFormElementAdd,
  submitButtonPopupElement,
  formData
}