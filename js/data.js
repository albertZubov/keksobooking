'use strict';

(function () {
  var QUANTITY = 8;
  var ESC_KEYCODE = 27;

/*// Функция создания и записи объектов в массив
function renderAnnouncement () {
  var arr = [];
  for (var i = 0; i < QUANTITY; i++) {
    arr[i] = window.createObj(i + 1);
  }
  return arr;
}

var arrayAnnouncement = renderAnnouncement();*/

// Создаю фрагмент и рохожу циклом по массиву, добавляю метку в фрагмент
window.loadHundler = function (card) {
  window.fragment = document.createDocumentFragment();
  for (var i = 0; i < card.length; i++) {
    window.fragment.appendChild(window.tagCreation(card[i]));
  }
}

// Нахождение окна ошибки в Темплайте
var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');

// Функция отрисовки окна ошибки запроса данных с сервера
window.errorHundler = function (errorMessage) {
  var addMainModal = document.querySelector('main');
  var modalErrorClone = similarErrorTemplate.cloneNode(true);

  addMainModal.insertAdjacentElement('beforeend', modalErrorClone);

  var errorBtn = document.querySelector('.error__button');
  var errorModal = document.querySelector('.error');

  errorBtn.addEventListener('click', function () {
    addMainModal.removeChild(errorModal);
  });

  errorModal.addEventListener('click', function () {
    addMainModal.removeChild(errorModal);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      addMainModal.removeChild(errorModal);
    }
  });
}

window.load(window.loadHundler, window.errorHundler);
})();

