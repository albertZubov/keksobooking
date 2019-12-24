'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var PIN_WIDHT_X = 62;

// Нахождение и удаление класса появления карты
window.mapEmergence = document.querySelector('.map');

// Задаю переменную для вызова функции
var filterCardCreation = window.cardCreation(window.createObj(2));

// Добавление элемента объявления в DOM
window.filterMap = document.querySelector('.map__filters-container');

// Объявляем перенные поиска элементов на странице
var formFieldset = document.querySelectorAll('fieldset');
var formSelect = document.querySelectorAll('select');
var form = document.querySelector('.ad-form');

// Добавляем и удаляем атрибуты к полям формы
var setRemoveFieldDisabled = function (field, status) {
  for (var i = 0; i < field.length; i++) {
    field[i].disabled = status;
  }
}

setRemoveFieldDisabled(formFieldset, true);
setRemoveFieldDisabled(formSelect, true);

// Создаем функцию перевода страницы из неактивного состояни в активное
var translationActiveState = function () {
  setRemoveFieldDisabled(formFieldset, false);
  setRemoveFieldDisabled(formSelect, false);
  document.querySelector('.map__pins').appendChild(window.fragment);
  document.querySelector('.map').insertBefore(filterCardCreation, window.filterMap);
  window.mapEmergence.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  window.getAdressInput(PIN_WIDHT_X, window.PIN_HEIGHT_Y);
};

// Создаем функцию, которая вызывается при нажатии на enter
var onMapActiveEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    translationActiveState();
  }
};

// Добавялем обработчик события на метку по нажатию на enter
window.mainPin.addEventListener('keydown', onMapActiveEnterPress);


// Добавялем обработчик события на метку по наведению и клику
window.mainPin.addEventListener('mousedown', function() {
  translationActiveState();
});
})();

