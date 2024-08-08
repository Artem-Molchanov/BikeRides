import React, { useEffect, useState } from 'react';
import './MapComponent.css';



function Map() {
  const [wayPoints, setWayPoints] = useState([]);
  const [distance, setDistance] = useState()
  const [duration, setDuration] = useState()
  const [isMap, setIsMap] = useState(false);
  
  console.log(isMap);
  

  useEffect(() => {
    if (!isMap) {
      const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src =
      'https://api-maps.yandex.ru/2.1/?apikey=24c18903-4f64-4649-87e4-d2621aa227b9&lang=ru_RU';
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

        var multiRoutePromise = control.routePanel.getRouteAsync();
        multiRoutePromise.then(
          function (multiRoute) {
            // Подписка на событие обновления мультимаршрута.
            multiRoute.model.events.add('requestsuccess', function () {
              // Получение ссылки на активный маршрут.
              var activeRoute = multiRoute.getActiveRoute();
              if (activeRoute) {
                setDistance(activeRoute.properties.get('distance').text)
                // Вывод информации об активном маршруте.
                console.log(
                  'Длина: ' + activeRoute.properties.get('distance').text
                );
                setDuration(activeRoute.properties.get('duration').text)
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
              console.log('wayPoints', wayPoints);
              const points =[]
              wayPoints.each(function (point) {
                points.push(point.geometry._coordinates)
                console.log(point.geometry._coordinates);
                
              });
              setWayPoints(points)
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
        // console.log('routePanel', control.routePanel);
        
        // console.log(myMap);
      }

      // myMap.addChild(mapListeners);
    };
    

    // Удаляем скрипт при размонтировании компонента
    return () => {
      document.body.removeChild(script);
      setIsMap(false)
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
