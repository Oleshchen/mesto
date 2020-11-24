export class FormValidator {
  constructor(data, popup) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonProfile = data.submitButtonProfile;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._popup = popup;
  }
  // Обработчики событий
  _setEventListeners() {
    this._inputList = Array.from(this._popup.querySelectorAll(this._inputSelector));
    
    this._buttonElement = this._popup.querySelector(this._submitButtonProfile);
    
      this._inputList.forEach((inputElement) => {
        
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
   }
 
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._popup.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError (inputElement)  {
    const errorElement = this._popup.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true; 
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  // Очистка форм
  _clearPopup() {
    const submitButtonPopup = this._popup.querySelectorAll('.popup__save-button');
    const popupInputField = this._popup.querySelectorAll('.popup__input');
    const popupSpan = this._popup.querySelectorAll('.popup__error_hidden');
    
    popupInputField.forEach((inputElement) => {
      inputElement.classList.remove('popup__input_error');
    });
  
    popupSpan.forEach((inputElement) => {
      inputElement.textContent = '';
      inputElement.classList.remove('popup__error_hidden');
    });
  
    submitButtonPopup.forEach((inputElement) => {
      if (popupInputField.value !== '') {
      inputElement.classList.remove('popup__save-button_disabled');
      }
    });
  }

  enableValidation() {
    this._clearPopup(this._popup);
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._popup);
  }
}