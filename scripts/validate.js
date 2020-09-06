// валидация форм
const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage ) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorClass, inputErrorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
 }

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);  
  }
  else {buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;}
}  

const setEventListeners = (formElement, {inputSelector, submitButtonProfile, inactiveButtonClass, inputErrorClass, errorClass}, ...rest) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonProfile);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

const enableValidation = ({formSelector, ...rest}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));

  getFormList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, rest);
    
  });
}

const disableButton = (button) => {
    button.classList.add('popup__save-button_disabled');
    button.disabled = true;
    ;
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonProfile: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_hidden'
}); 

// фуннкция очистки Popup
function clearPopup(pop) {

  const submitButtonPopup = pop.querySelectorAll('.popup__save-button');
  const popupInputField = pop.querySelectorAll('.popup__input');
  const popupSpan = pop.querySelectorAll('.popup__error_hidden');
  
  popupInputField.forEach((inptElement) => {
    inptElement.classList.remove('popup__input_error');
  });

  popupSpan.forEach((inptElement) => {
    inptElement.textContent = '';
    inptElement.classList.remove('popup__error_hidden');
  });

  submitButtonPopup.forEach((inptElement) => {
    if (popupInputField.value !== '') {
    inptElement.classList.remove('popup__save-button_disabled');
    }
  });
}