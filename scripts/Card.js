export class Card {
    constructor(data, cardSelector, openPopup, popupPlace) {
        this._image = data.link;
        this._text = data.name;
        this._cardSelector = cardSelector;
        this._openPopup = openPopup;
        this._popupPlace = popupPlace;
    }
    
    // Забираем разметку из HTML и клонируем элемент. Метод приватный
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

    return cardElement;
   
  }
  
    // Удаляем элемент
    _deleteCardClick() {
        this._element.closest('.element').remove();
        this._element = null;
    }
    // Ставим Like
    _likeCardClick() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_push');
    }
    // Открываем Popup для просмотра изображения элемента
    _imageViewClick() {
        const imageSource = document.querySelector('.popup__full-image');
        const imageName = document.querySelector('.popup__viewer-text');
        imageSource.src = this._image;
        imageName.textContent = this._text;
        this._openPopup(this._popupPlace);
      }

    // Добовляем обработчики событий 
    _setEventListeners() {
        // добовляем обработчик на унопку удалить элемент
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteCardClick();
          });
        // добовляем обработчик на унопку Like
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._likeCardClick();
          });
        // добовляем обработчик на картинку элемента
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._imageViewClick();
          }); 
    }  

    // публичный метод создает и возвращает элемент
    generateElement() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__image').alt = this._text;
        this._element.querySelector('.element__name').textContent = this._text;

        return this._element;   
    }
}