'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var popupElement = document.querySelector('.popup');
  var formWindowElement = popupElement.querySelector('.popup__form-window');
  var SuccessWindowElement = popupElement.querySelector('.popup__success-window');
  var toggleElement = document.querySelector('.nav__toggle');

  var onPopupAreaClick = function (event) {
    if(event.target.classList.contains('popup')) {
      event.stopPropagation();
      onPopupClose();
    };
  };

  var getEscEvent = function (escEvt, action) {
    if (escEvt.key === ESC_KEY) {
      action();
    };
  };

  var onPopupButtonClose = function (event) {
    if (event.target.classList.contains('popup__button-close')) {
      onPopupClose();
    };
  };

  var onEscPopupClose = function (event) {
    getEscEvent(event, onPopupClose);
  };

  var onPopupOpen = function (event) {
    if (event.target.classList.contains('capture-block__button') || event.target.classList.contains('contacts__callback-button')) {
      popupElement.classList.remove('popup--closed');

      document.removeEventListener('click', onPopupOpen);
      document.removeEventListener('mousemove', window.animation);
      popupElement.addEventListener('click', onPopupButtonClose);
      document.addEventListener('keydown', onEscPopupClose);
      popupElement.addEventListener('click', onPopupAreaClick);
      popupElement.addEventListener('submit', onFormSend);
    }
  };

  var onPopupClose = function (event) {
    popupElement.classList.add('popup--closed');

    if (!popupElement.classList.contains('popup__form-window--closed')) {
      formWindowElement.classList.remove('popup__form-window--closed');
      SuccessWindowElement.classList.add('popup__success-window--closed');
    };

    document.addEventListener('click', onPopupOpen);
    document.addEventListener('mousemove', window.animation);
    document.removeEventListener('keydown', onEscPopupClose);
    popupElement.removeEventListener('click', onPopupAreaClick);
    popupElement.removeEventListener('submit', onFormSend);
  };

  var onFormSend = function (event) {
    event.preventDefault();
    SuccessWindowElement.classList.remove('popup__success-window--closed');
    formWindowElement.classList.add('popup__form-window--closed');
  };


  if (window.matchMedia('(min-width: 992px)').matches){
    document.addEventListener('mousemove', window.animation);
  } else {
    toggleElement.addEventListener('click', window.toggle);
  };

  document.addEventListener('click', onPopupOpen);
})();
