import { useEffect, useState } from "react";
import './MapComponent.css';
import axiosInstance from "../../axiosInstance";



function MapForm({currentRoute, setAllRoutes, allRoutes}) {
  const [coord, setCoord] = useState([])
  const [isMap, setIsMap] = useState(false);
  
  console.log("HHHHH",currentRoute.coordinates);
  // useEffect(() => {
    //   axiosInstance
    //     .get(`${import.meta.env.VITE_API}/routes/${routeId}/coordinates`)
  //     .then((response) => setCoord(response.data))
  //     .catch((err) => console.log("Ошибка:", err));
  // }, [routeId]);
  
 
  // useEffect(() => {
			// 	axiosInstance
			// 		.get(`${import.meta.env.VITE_API}/route`)
			// 		.then(data => setAllRoutes(data.data))
			// 		.catch(err => console.log('Ошибка :', err));
			// }, []);
      
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
            const myMap = new ymaps.Map('mapForm', {
              center: currentRoute.coordinates[0],//! изменить точку входа на карту первая переменная маршрута
              zoom: 13,
              controls: [],
            });
    
            var multiRoute = new ymaps.multiRouter.MultiRoute({
              referencePoints: currentRoute.coordinates

                // вносятся координаты
                  // `${coord}`
                                }, {
              // Внешний вид путевых точек.
              wayPointStartIconColor: "#FFFFFF",
              wayPointStartIconFillColor: "#B3B3B3",
              // Внешний вид линии активного маршрута.
              routeActiveStrokeWidth: 8,
              routeActiveStrokeStyle: 'solid',
              routeActiveStrokeColor: "#002233",
              
          });
          myMap.geoObjects.add(multiRoute)
          setIsMap(true);
          }
        };
        
        // Удаляем скрипт при размонтировании компонента
        return () => {
          document.body.removeChild(script);
        };
      }
      }, []);
    
      console.log('asdf');
    
    
    
      return (
        <div
          id='mapForm'
          className='map1'
          >
        </div>
      );
    }
export default MapForm;