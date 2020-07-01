'use strict';

(function () {
  var toggleElement = document.querySelector('.nav__toggle');
  var navItem = document.querySelectorAll('.nav__item');

  var onToggleOpen = function () {
    toggleElement.classList.add('nav__toggle--cross');

    navItem.forEach(elm => {
      elm.classList.add('nav__item--open');
    });

    toggleElement.removeEventListener('click', onToggleOpen);
    toggleElement.addEventListener('click', onToggleClose);
  }

  var onToggleClose = function () {
    toggleElement.classList.remove('nav__toggle--cross');

    navItem.forEach(elm => {
      elm.classList.remove('nav__item--open');
    });

    toggleElement.addEventListener('click', onToggleOpen);
    toggleElement.removeEventListener('click', onToggleClose);
  }

  window.toggle = onToggleOpen;

})();
