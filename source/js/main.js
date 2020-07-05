'use strict';

(function () {
  var topWrapperElement = document.querySelector('.page-header__top-wrapper');
  var toggleElement = topWrapperElement.querySelector('.toggle');
  var toggleIconElement = toggleElement.querySelector('.toggle__icon');
  var logoElement = topWrapperElement.querySelector('.logo');
  var backButtonElement = topWrapperElement.querySelector('.page-header__back-button');
  var navListWrapperElement = document.querySelector('.nav__list-wrapper');
  var navListElement = navListWrapperElement.querySelector('.nav__list');
  var catalogElement = navListWrapperElement.querySelector('.catalog');
  var catalogTextElement = catalogElement.querySelector('.catalog__text');
  var navListElement = navListWrapperElement.querySelector('.nav__list');

  var goUp = function () {

      window.scroll(0, 0);
  }

  // Navlist

  var openNavSublist = function () {
    logoElement.classList.add('logo--menu-active');
    topWrapperElement.classList.add('page-header__top-wrapper--submenu-active');
    catalogTextElement.classList.add('nav__text--active');

    goUp();

    catalogElement.querySelectorAll('.catalog__item').forEach(function (element) {
      if (!element.classList.contains('catalog__item--menu-show')) {
        element.classList.add('catalog__item--hidden');
      }
    })

    navListElement.querySelectorAll('.nav__item').forEach(function (element) {
      if (!element.classList.contains('nav__item--menu-show')) {
        element.classList.add('nav__item--hidden');
      }
    })


    toggleElement.removeEventListener('click', onToggleClose);
    toggleElement.addEventListener('click', onCloseNavSublist);
    backButtonElement.addEventListener('click', onBackNavButton);
  };


  var onNavItem = function (event) {
    if (event.currentTarget.classList.contains('nav__item--sublist')) {

      event.preventDefault();
      event.currentTarget.classList.add('nav__item--menu-show');
      openNavSublist();
    }
  }

  var getCloseNavSubListEvent = function () {
    navListElement.querySelector('.nav__item--menu-show').classList.remove('nav__item--menu-show');
    logoElement.classList.remove('logo--menu-active');
    topWrapperElement.classList.remove('page-header__top-wrapper--submenu-active');
    navListElement.classList.remove('nav__list--closed');
    catalogTextElement.classList.remove('nav__text--active');

    catalogElement.querySelectorAll('.catalog__item').forEach(function (element) {
      element.classList.remove('catalog__item--hidden');
    })

    navListElement.querySelectorAll('.nav__item').forEach(function (element) {
      if (!element.classList.contains('nav__item--menu-show')) {
        element.classList.remove('nav__item--hidden');
      }
    })

    backButtonElement.removeEventListener('click', onBackNavButton);
    toggleElement.removeEventListener('click', onCloseNavSublist);
  };

  var onBackNavButton = function () {
    getCloseNavSubListEvent();

    toggleElement.addEventListener('click', onToggleClose);
  };

  var onCloseNavSublist = function () {
    getCloseNavSubListEvent();
    onToggleClose();

    toggleElement.removeEventListener('click', onCloseNavSublist);
  };

  // Catalog

  var getCloseSubListEvent = function () {
    catalogElement.querySelector('.catalog__item--menu-show').classList.remove('catalog__item--menu-show');
    logoElement.classList.remove('logo--menu-active');
    topWrapperElement.classList.remove('page-header__top-wrapper--submenu-active');
    navListElement.classList.remove('nav__list--closed');
    catalogTextElement.classList.remove('catalog__text--active');

    catalogElement.querySelectorAll('.catalog__item').forEach(function (element) {
      element.classList.remove('catalog__item--hidden');
    })

    toggleElement.removeEventListener('click', onCloseSublist);
    backButtonElement.removeEventListener('click', onBackButton);
  };

  var openSublist = function () {
    logoElement.classList.add('logo--menu-active');
    topWrapperElement.classList.add('page-header__top-wrapper--submenu-active');
    navListElement.classList.add('nav__list--closed');
    catalogTextElement.classList.add('catalog__text--active');

    catalogElement.querySelectorAll('.catalog__item').forEach(function (element) {
      if (!element.classList.contains('catalog__item--menu-show')) {
        element.classList.add('catalog__item--hidden');
      }
    })

    goUp();

    toggleElement.removeEventListener('click', onToggleClose);
    toggleElement.addEventListener('click', onCloseSublist);
    backButtonElement.addEventListener('click', onBackButton);
  };

  var onBackButton = function () {
    getCloseSubListEvent();

    toggleElement.addEventListener('click', onToggleClose);
  };

  var onCloseSublist = function () {
    getCloseSubListEvent();
    onToggleClose();

    toggleElement.removeEventListener('click', onCloseSublist);
  };

  var onCatalogItem = function (event) {
    if (event.currentTarget.classList.contains('catalog__item--sublist')) {

      event.preventDefault();
      event.currentTarget.classList.add('catalog__item--menu-show');
      openSublist();
    }
  }

  var onToggleOpen = function () {

    toggleElement.classList.add('toggle--cross');
    toggleIconElement.classList.add('toggle__icon--active');
    navListWrapperElement.classList.add('nav__list-wrapper--active');

    catalogElement.querySelectorAll('.catalog__item').forEach(function (element) {
      element.addEventListener('click', onCatalogItem);
    });

    navListElement.querySelectorAll('.nav__item').forEach(function (element) {
      element.addEventListener('click', onNavItem);
    });

    toggleElement.removeEventListener('click', onToggleOpen);
    toggleElement.addEventListener('click', onToggleClose);
  }

  var onToggleClose = function () {
    toggleElement.classList.remove('toggle--cross');
    toggleIconElement.classList.remove('toggle__icon--active');
    navListWrapperElement.classList.remove('nav__list-wrapper--active');


    catalogElement.querySelectorAll('.catalog__item').forEach(function (element) {
      element.removeEventListener('click', onCatalogItem);
    });

    toggleElement.addEventListener('click', onToggleOpen);
    toggleElement.removeEventListener('click', onToggleClose);
  }

  toggleElement.addEventListener('click', onToggleOpen);
})();
