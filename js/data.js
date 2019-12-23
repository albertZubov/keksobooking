'use strict';

(function () {
  var QUANTITY = 8;

// Функция создания и записи объектов в массив
function renderAnnouncement () {
  var arr = [];
  for (var i = 0; i < QUANTITY; i++) {
    arr[i] = window.createObj(i + 1);
  }
  return arr;
}

var arrayAnnouncement = renderAnnouncement();

// Создаю фрагмент
window.fragment = document.createDocumentFragment();

// Прохожу циклом по массиву и добавляю метку в фрагмент
for (var i = 0; i < arrayAnnouncement.length; i++) {
  window.fragment.appendChild(window.tagCreation(arrayAnnouncement[i]));
}
})();

