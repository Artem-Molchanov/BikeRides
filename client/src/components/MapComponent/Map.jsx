import React, { useEffect, useState } from 'react';
import './MapComponent.css';


function Map({
  remuveMap,
  setRemuveMap,
  coord,
  setCoord,
  duration,
  setDuration,
  distanceOnMap,
  setDistanceOnMap,
  wayPointsOnMap,
  setWayPointsOnMap,
  
  
}) {
  const [isMap, setIsMap] = useState(false);

  useEffect(() => {
    const findClass = document.querySelector('.ymaps-2-1-79-map');
    if (!remuveMap) {
      if (findClass) document.body.removeChild(findClass);
    }

    if (!isMap) {
      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.src =
        'https://api-maps.yandex.ru/2.1.78/?apikey=24c18903-4f64-4649-87e4-d2621aa227b9&lang=ru_RU';
      script.async = true;

      document.body.appendChild(script);
      script.onload = () => {
        ymaps.ready(init);
        function init() {
          const myMap = new ymaps.Map('map', {
            center: [55.7575079768237, 37.61915426232428], //! изменить точку входа на карту
            zoom: 12,
            // controls: [],
            controls: ['routePanelControl'],
          });

          const control = myMap.controls.get('routePanelControl');

          control.routePanel.options.set({
            autofocus: false,
            types: {
              bicycle: true,
            },
          });

          setIsMap(true);
          setRemuveMap(true);

          // var wayPoints = route.getWayPoints();

          var multiRoutePromise = control.routePanel.getRouteAsync();
          multiRoutePromise.then(
            function (multiRoute) {
              multiRoute.model.events.add('requestsuccess', function () {
                // Получение ссылки на активный маршрут.
                var activeRoute = multiRoute.getActiveRoute();
                if (activeRoute) {
                  setDistanceOnMap(activeRoute.properties.get('distance').text);
                  // Вывод информации об активном маршруте.
                  console.log(
                    'Длина: ' + activeRoute.properties.get('distance').text
                  );
                  setDuration(activeRoute.properties.get('duration').text);
                  console.log(
                    'Время прохождения: ' +
                      activeRoute.properties.get('duration').text
                  );
                }
              });
              multiRoute.model.events.add('requestsuccess', function () {
                // Коллекция путевых точек маршрута.
                var wayPoints = multiRoute.getWayPoints();
                // Проход по коллекции путевых точек.

                const points = [];
                wayPoints.each(function (point) {
                  points.push(point.geometry._coordinates);
                });
                setWayPointsOnMap(points);
                // console.log('points',wayPointsOnMap);
              });
            },
            function (err) {
              console.log(err);
            }
          );
          multiRoute.model.events.add('requestsuccess', function () {
            // Коллекция путевых точек маршрута.
            var wayPoints = multiRoute.getWayPoints();

            wayPoints.each(function (point) {
              point.options.set({
                preset: 'islands#redStretchyIcon',
                iconContentLayout: ymaps.templateLayoutFactory.createClass(
                  '{{ properties.request|raw }}'
                ),
              });
            });
          });
        }
      };

      // Удаляем скрипт при размонтировании компонента
      return () => {
        setIsMap(false);
        document.body.removeChild(script);
        setIsMap(false);
        setDistanceOnMap();
      };
    }
  }, []);

  console.log('asdf');

  return (
    <div
      id='map'
      className='map1'
      // style={{ height: '400px' }}
    ></div>
  );
}

export default Map;
