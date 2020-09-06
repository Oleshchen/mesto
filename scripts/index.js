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
const popupForm = popupElementAddForm.querySelector('.popup__form');
const submitButtonPopupElement = document.querySelector('.popup__save-button-element');


// добавляем карточки 

const addElement = function(card)  {
  const element = document.querySelector('#cardTemplate').content.cloneNode(true);
  const elementName = element.querySelector('.element__name');
  const elementImage = element.querySelector('.element__image'); 
  const elementFullImage = document.querySelector('.popup__full-image');
  const elementViewerText = document.querySelector('.popup__viewer-text');
  const elementDeleteButton = element.querySelector('.element__delete-button');
  const elementLikeButton = element.querySelector('.element__like-button');
  elementName.textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;
  
  elementLikeButton.addEventListener('click', event => {
    event.target.classList.toggle('element__like-button_push');
  });
   
  elementDeleteButton.addEventListener('click', event => {
    event.target.closest('.element').remove();
  });

  elementImage.addEventListener('click', (event) => {
    
    elementFullImage.src = event.target.src;
    elementViewerText.textContent = card.name; 
    popupTogle(popupViewerOpen); 
    
  });
  return element;
  
}

const prependElement = someElement => {elementsContainer.prepend(addElement(someElement));}

function evtListener(pop) {
  if (pop.classList.contains('popup_visibility')) {
    document.addEventListener('keydown', keyEventSwitch)
  }
  else {
    document.removeEventListener('keydown', keyEventSwitch)
  }

}

const keyEventSwitch = (event) => {
  if(event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_visibility');
    popupTogle(popupOpened);
  }
}


// открываем-закрываем popup's
const popupTogle = pop => {
  pop.classList.toggle ('popup_visibility');
  evtListener(pop);
  popupOverlayClose(pop);
}

// функции для отправки submit
function formSubmitProfile (event) {
  event.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  infoName.textContent = nameInputValue;
  profession.textContent = jobInputValue;
  popupTogle(popupEditorForm);
}

function formSubmitElement (event) {
  event.preventDefault();
  const addNewElement = {
    name: mestoInputName.value,
    link: mestoInputSrc.value    
  }
  prependElement(addNewElement);
  popupForm.reset();
  popupTogle(popupElementAddForm);
  

}  

// слушатели событий
popupOpenButton.addEventListener('click', () => {
  const professionValue = profession.textContent;
  const infoNameValue = infoName.textContent;
  jobInput.value = professionValue;
  nameInput.value = infoNameValue;
  clearPopup(popupEditorForm);
  popupTogle(popupEditorForm);
  
});
popupEditorForm.addEventListener('submit', formSubmitProfile);
popupElementAddForm.addEventListener('submit', formSubmitElement);

function popupOverlayClose(pop) {
  pop.addEventListener('mousedown', (event) => {
    if(event.target === event.currentTarget) {
      popupTogle(pop);
    }
  });
}
elementAddButton.addEventListener('click',  () => {
  clearPopup(popupElementAddForm); 
  popupTogle(popupElementAddForm);
  disableButton(submitButtonPopupElement);
  
  
  
}); 
popupCloseButtonProfile.addEventListener('click', () => {
  
  popupTogle(popupEditorForm);
});
popupCloseButtonElement.addEventListener('click', () => {
  popupForm.reset();
  popupTogle(popupElementAddForm);
});
popupCloseButtonImageView.addEventListener('click', () => {
  
  popupTogle(popupViewerOpen);
});

initialCards.forEach(prependElement);

