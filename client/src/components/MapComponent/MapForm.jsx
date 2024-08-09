import { useEffect, useState } from "react";
import './MapComponent.css';
import axiosInstance from "../../axiosInstance";
import { useLocation } from 'react-router-dom';

function MapForm({
  currentRoute,
  setAllRoutes,
  allRoutes,
  duration,
  setDuration,
  distance,
  setDistance,
  wayPointsOnMap,
  setWayPointsOnMap,
}) {
  const [coord, setCoord] = useState([]);
  const [isMap, setIsMap] = useState(false);

  const { pathname } = useLocation();

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
        ymaps;
        function init() {
          const myMap = new ymaps.Map('mapForm', {
            center: currentRoute.coordinates[0],
            zoom: 13,

            controls: [],
          });

          const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
              referencePoints: currentRoute.coordinates,

              // вносятся координаты
              // `${coord}`
            },
            {
              // Внешний вид путевых точек.
              wayPointStartIconColor: '#FFFFFF',
              wayPointStartIconFillColor: '#B3B3B3',
              // Внешний вид линии активного маршрута.
              routeActiveStrokeWidth: 8,
              routeActiveStrokeStyle: 'solid',
              routeActiveStrokeColor: '#957CFC',
            }
          );

          if (pathname.includes('edit')) multiRoute.editor.start();
          myMap.geoObjects.add(multiRoute);
          setIsMap(true);

          multiRoute.model.events.add('requestsuccess', function () {
            // Получение ссылки на активный маршрут.
            var activeRoute = multiRoute.getActiveRoute();
            if (activeRoute) {
              setDistance(activeRoute.properties.get('distance').text);
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

            const wayPoint = [];

            wayPoints.each(function (point) {
              console.log('point', point);
              wayPoint.push(point.geometry._coordinates);
            });
            setWayPointsOnMap(wayPoint);
          });

          // Добавление маршрута на карту.
          myMap.geoObjects.add(multiRoute);
        }
      };

      // Удаляем скрипт при размонтировании компонента
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  // console.log('asdf');

  return <div id='mapForm' className='map1'></div>;
}
export default MapForm;