import {
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
  formData} from './consts.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const userForm = new FormValidator(formData, popupEditorForm);
userForm.enableValidation();
const elementForm = new FormValidator(formData, popupElementAddForm);
elementForm.enableValidation();  


function evtListener(pop) {
  if (pop.classList.contains('popup_visibility')) {
    document.addEventListener('keydown', keyEventSwitch);
    pop.addEventListener('mousedown', popupOverlayClose);
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

function popupOverlayClose(event) {
  if(event.target === event.currentTarget) {
    const popupOpened = document.querySelector('.popup_visibility');
    popupTogle(popupOpened );
  }
} 

function popupTogle(pop) {
  pop.classList.toggle ('popup_visibility');
  evtListener(pop); 
}

function formSubmitProfile (event) {
  event.preventDefault();
  infoName.textContent = nameInput.value;
  profession.textContent = jobInput.value;
  popupTogle(popupEditorForm);
}

popupOpenButton.addEventListener('click', () => {
  userForm.clearPopup();
  jobInput.value = profession.textContent;
  nameInput.value = infoName.textContent;
  popupTogle(popupEditorForm);
});

popupEditorForm.addEventListener('submit', formSubmitProfile);
popupElementAddForm.addEventListener('submit', formSubmitElement);




elementAddButton.addEventListener('click',  () => {
  elementForm.clearPopup();
  popupTogle(popupElementAddForm);
  submitButtonPopupElement.classList.add('popup__save-button_disabled');
  submitButtonPopupElement.disabled = true;
  popupFormElementAdd.reset();
}); 

// закрытие popup редактирования profile
popupCloseButtonProfile.addEventListener('click', () => {
  popupTogle(popupEditorForm); 
});

// закрытие popup редактирования карточки
popupCloseButtonElement.addEventListener('click', () => {
  popupTogle(popupElementAddForm);    
});

// закрытие popup просмотра изображения
popupCloseButtonImageView.addEventListener('click', () => {
  popupTogle(popupViewerOpen);
});

function formSubmitElement (event) {
  event.preventDefault();
  elementsContainer.prepend(createCard({name: `${mestoInputName.value}`, link: `${mestoInputSrc.value}`}).generateElement());
  popupTogle(popupElementAddForm);
}  

submitButtonPopupElement.addEventListener('submit', formSubmitElement);

function createCard(item) {
  return new Card(item, '#cardTemplate', popupTogle, popupViewerOpen)
}

initialCards.forEach((item) => {
  const cardElement = createCard(item).generateElement();
  elementsContainer.append(cardElement);
});