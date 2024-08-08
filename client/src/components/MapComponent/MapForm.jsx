import { useEffect, useState } from "react";
import './MapComponent.css';


const script = document.createElement('script');

function MapForm() {
  // const [coord, setCoord] = useState([])
  const [isMap, setIsMap] = useState(false);
  // setIsMap(false)

  useEffect(() => {
    // axiosInstance.get('/').then((res)=>{
    //   setCoord(res.data)// получить данные из базы где первый элемент старт и второй финиш

    // })
    
    if (!isMap) {
    script.setAttribute('type', 'text/javascript');
    script.src =
      'https://api-maps.yandex.ru/2.1/?apikey=24c18903-4f64-4649-87e4-d2621aa227b9&lang=ru_RU';
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      ymaps.ready(init);
      function init() {
        const myMap = new ymaps.Map('mapForm', {
          center: [55.7575079768237, 37.61915426232428],//! изменить точку входа на карту первая переменная маршрута
          zoom: 15,
          controls: [],
        });

        var multiRoute = new ymaps.multiRouter.MultiRoute({
          referencePoints: [
            [55.734470, 37.58000],
       
        [55.724102, 37.19912]
            // вносятся координаты
              // `${coord}`
              
             
          ]
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
      className='map'
      >
    </div>
  );
}

export default MapForm;