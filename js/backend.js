'use strict';

(function () {
  window.URL_GET = 'https://js.dump.academy/keksobooking/data';
  window.URL_POST = 'https://js.dump.academy/keksobooking';
  window.requestPost = 'POST';
  window.requestGet = 'GET';

  window.loadSave = function (onLoad, onError, request, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка');
    });

    xhr.open(request, url);
    xhr.send(data);
  }
})();

