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

const popup = document.querySelector('.popup');
const popupEditorForm = document.querySelector('.popup_profile-edit');
const popupElementAddForm = document.querySelector('.popup_image-add'); 
const popupOpenButton = document.querySelector('.profile__info-button');
const popupViewerOpen = document.querySelector('.popup_viewer');
const popupCloseButtonProfile = document.querySelector('.popup__close-button-profile');
const popupCloseButtonElement = document.querySelector('.popup__close-button-element');
const popupCloseButtonImageView = document.querySelector('.popup__close-button-image');
const nameInput = popup.querySelector('.popup__input_name');
const jobInput = popup.querySelector('.popup__input_profession');
const mestoInputName = document.querySelector('.popup__input_image-name');
const mestoInputSrc = document.querySelector('.popup__input_image-src');
const infoName = document.querySelector('.profile__info-name');
const profession = document.querySelector('.profile__profession');
const elementImage = document.querySelector('.element__image');
const elementsContainer = document.querySelector('.elements');
const elementAddButton = document.querySelector('.profile__add-button ');

// добавляем карточки 

const addElement = function(card)  {
  const element = document.querySelector('#cardTemplate').content.cloneNode(true);
  const elementName = element.querySelector('.element__name');
  const elementImage = element.querySelector('.element__image'); 
  elementName.textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;
  
  element.querySelector('.element__like-button').addEventListener('click', event => {
    event.target.classList.toggle('element__like-button_push');
  });
   
  element.querySelector('.element__delete-button').addEventListener('click', event => {
    event.target.closest('.element').remove();
  });

  elementImage.addEventListener('click', (event) => {
    
    document.querySelector('.popup__full-image').src = event.target.src;
    document.querySelector('.popup__viewer-text').textContent = card.name; 

    popupViewerOpen.classList.toggle('popup_visibility');
  });
  elementsContainer.prepend(element)
}

 // открываем-закрываем popup's
popupTogle = (pop) => {
  if (pop == popupEditorForm) {
    popupEditorForm.classList.toggle ('popup_visibility');
  }
  else if (pop == popupElementAddForm) {
    popupElementAddForm.classList.toggle ('popup_visibility');
  }
  else {
    popupEditorForm.classList.remove ('popup_visibility'); 
    popupElementAddForm.classList.remove('popup_visibility');
    popupViewerOpen.classList.remove('popup_visibility');
    
  }  
}

// функции для отправки submit
function formSubmitProfile (event) {
  event.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  infoName.textContent = nameInputValue;
  profession.textContent = jobInputValue;
  popupTogle();
}

function formSubmitElement (event) {
  event.preventDefault();
  const addNewElement = {
    name: mestoInputName.value,
    link: mestoInputSrc.value    
  }
  addElement(addNewElement);
  mestoInputName.form.reset();
  mestoInputSrc.form.reset();
  popupTogle();  
}  

// слушатели событий
popupOpenButton.addEventListener('click', (event) => {
  const professionValue = profession.textContent;
  const infoNameValue = infoName.textContent;
  jobInput.value = professionValue;
  nameInput.value = infoNameValue;
  popupTogle(popupEditorForm);
});
popupEditorForm.addEventListener('submit', formSubmitProfile);
popupElementAddForm.addEventListener('submit', formSubmitElement);

elementAddButton.addEventListener('click',  (event) => { 
  popupTogle(popupElementAddForm);
}); 
popupCloseButtonProfile.addEventListener('click', (event) => {
  popupTogle();
});
popupCloseButtonElement.addEventListener('click', (event) => {
  popupTogle();
});
popupCloseButtonImageView.addEventListener('click', (event) => {
  popupTogle();
});

initialCards.forEach(addElement);

