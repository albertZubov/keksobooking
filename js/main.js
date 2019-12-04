'use strict';

var QUANTITY = 8;
var TYPE_APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
var TIME_CHECKIN = ['12:00', '13:00', '14:00'];
var TIME_CHECKOUT = ['12:00', '13:00', '14:00'];
var apartments = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
}

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
  return arr[getRandom(0, arr.length)];
}


// Функция формирования объявления
function createObj(id) {
  var announcement = {
    "author": {
      "avatar": 'img/avatars/user0'+ id +'.png'
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
  return announcement;
}

// Функция создания и записи объектов в массив
function renderAnnouncement () {
  var arr = [];
  for (var i = 0; i < QUANTITY; i++) {
    arr[i] = createObj(i + 1);
  }
  return arr;
}

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

// Созданеи Dom-элемента объявления
var cardCreation = function (announcement) {
  var cardCreationTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardCreationTemplate.cloneNode(true);


  cardElement.querySelector('.popup__title').textContent = announcement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + 'Р/ночь';
  cardElement.querySelector('.popup__type').textContent = apartments[announcement.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + (announcement.offer.rooms === 1 ? ' комната для ' : ' комнаты для ') + announcement.offer.guests + (announcement.offer.guests === 1 ? ' гостя ' : ' гостей');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = announcement.offer.description;

  var featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (var i = announcement.offer.features.length - 1; i >= 0; i--) {
    var createFeaturesItem = document.createElement('li');
    createFeaturesItem.classList.add('popup__feature', 'popup__feature--' + announcement.offer.features[i]);
    featuresList.appendChild(createFeaturesItem);
  }

  var photoElement = cardElement.querySelector('.popup__photos');
  photoElement.innerHTML = '';
  for (var i = 0; i < announcement.offer.photos.length; i++) {
    var createImg = document.createElement('img');
    createImg.src = announcement.offer.photos[i];
    createImg.classList.add('popup__photo');
    createImg.width = '45';
    createImg.height = '40';
    createImg.alt = 'Фотография жилья';
    photoElement.appendChild(createImg);
  }

  cardElement.querySelector('.popup__avatar').setAttribute('src', announcement.author.avatar);

  return cardElement;
}

// Задаю переменную для вызова функции
var arrayAnnouncement = renderAnnouncement();
var filterCardCreation = cardCreation(createObj(2));

// Создаю фрагмент
var fragment = document.createDocumentFragment();

// Прохожу циклом по массиву и добавляю метку в фрагмент
for (var i = 0; i < arrayAnnouncement.length; i++) {
  fragment.appendChild(tagCreation(arrayAnnouncement[i]));
}

// Добавляю метку в DOM из фрагмента
document.querySelector('.map__pins').appendChild(fragment);

// Добавление элемента объявления в DOM
var filterMap = document.querySelector('.map__filters-container');
document.querySelector('.map').insertBefore(filterCardCreation, filterMap);
