'use strict';

(function () {
  var QUANTITY = 8;

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
var loadHundler = function (card) {
  window.fragment = document.createDocumentFragment();
  for (var i = 0; i < card.length; i++) {
    window.fragment.appendChild(window.tagCreation(card[i]));
  }
}

// Нахождение окна ошибки в Темплайте
var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');

// Функция отрисовки окна ошибки запроса данных с сервера
window.errorHundler = function (errorMessage) {
  var modalError = similarErrorTemplate.cloneNode(true);
  document.body.insertAdjacentElement('afterbegin', modalError);
}

window.load(loadHundler, window.errorHundler);
})();

