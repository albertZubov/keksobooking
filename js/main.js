'use strict';

var QUANTITY = 8;
var TYPE_APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
var TIME_CHECKIN = ['12:00', '13:00', '14:00'];
var TIME_CHECKOUT = ['12:00', '13:00', '14:00'];

// Нахождение и удаление класса появления карты
var mapEmergence = document.querySelector('.map');
mapEmergence.classList.remove('map--faded');

// Функция генерации случайного числа в заданном интервале
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Функция, которая возвращает случайный элемент массива
function randomArr(arr) {
 var randomElement = arr[getRandom(0, arr.length)];
 return randomElement;
}

// Функция формирования объявления
function createObj() {
  var arr = [];

  for (var i = 0; i < QUANTITY; i++) {
    var announcement = {
      "author": {
        "avatar": 'img/avatars/user0' + (i + 1) + '.png'
      },

      "offer": {
        "title": 'Mustard Hotel Asakusa',
        "address": '600, 350',
        "price": getRandom(1000, 20000),
        "type": randomArr(TYPE_APARTMENTS),
        "rooms": getRandom(1,5),
        "guests": getRandom(1,8),
        "checkin": randomArr(TIME_CHECKIN),
        "checkout": randomArr(TIME_CHECKOUT),
        "features": ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        "description": 'Отель Mustard Asakusa 2 удобно расположен в районе Таито в Токио, в 200 м от торгового центра Ekimise Asakusa, в 300 м от ворот Гозомон и в 300 м от ворот Нитенмон. Отель находится недалеко от публичного зала Asakusa, концертного зала Sumida Riverside Hall и торгового центра Asakusa ROX. К услугам гостей круглосуточная стойка регистрации и бесплатный Wi-Fi на всей территории.',
        "photos": ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },

      "location": {
        "x": getRandom(0, 1200),
        "y": getRandom(130, 630)
      }
    }
    arr[i] = announcement;
  }
  return arr;
};


// Функция создания метки на основе клонирования, подставление данных в нее из объекта
var tagCreation = function (announcement) {
  var tagCreationTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var tagElement = tagCreationTemplate.cloneNode(true);

  tagElement.style.left = announcement.location.x + 'px';
  tagElement.style.top = announcement.location.y + 'px';
  tagElement.querySelector('img').setAttribute('src', announcement.author.avatar);
  tagElement.querySelector('img').setAttribute('alt', announcement.offer.title);

  return tagElement;
}

// Задаю переменную для вызова функции
var arrayAnnouncement = createObj();

// Создаю фрагмент
var fragment = document.createDocumentFragment();

// Прохожу циклом по массиву и добавляю метку в фрагмент
for (var i = 0; i < arrayAnnouncement.length; i++) {
  fragment.appendChild(tagCreation(arrayAnnouncement[i]));
}

// Добавляю метку в DOM из фрагмента
document.querySelector('.map__pins').appendChild(fragment);


