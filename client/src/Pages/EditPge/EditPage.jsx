import { useState } from "react";
import Map from "../../components/MapComponent/Map";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

export default function EditRoute({
  allRoutes,
  allUsers,
  currentRoute,
  user,
  wayPointsOnMap,
  distance,
  setChange,
  duration,
  setDuration,
  setDistance,
  setWayPointsOnMap,
}) {
  const navigate = useNavigate();
  const initialState = {
    name: currentRoute.name,
    info: currentRoute.info,
    locality: currentRoute.locality,
  };
  // console.log(distance);

  const [inputs, setInputs] = useState(initialState);

  const inputsHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      ...inputs,
      coordinates: wayPointsOnMap,
      routeLength: distance,
    };

    // console.log( "distance", payload)
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API}/routes/${currentRoute.id}`
    );
    if (response.status === 200) {
      setChange(true);
      
      navigate("/about");
    }
  };

  return (
    <div>
      <div className="dataRout">
        <div>
          <div className="nameInAccount">{user.name}</div>
          <div className="addNewRout">РЕДЕКТИРОВАНИЕ МАРШРУТА</div>
          <div className="boxFormAdd">
            <form className="form">
              <input
                className="input"
                onChange={inputsHandler}
                name="name"
                placeholder="Название маршрута"
                value={inputs.name}
              />
              <div className="description">Описание маршрута</div>
              <textarea
                className="textDescription"
                onChange={inputsHandler}
                name="info"
                value={inputs.info}
              ></textarea>
              <input
                className="input"
                onChange={inputsHandler}
                name="locality"
                placeholder="📍Населённый пункт"
                value={inputs.locality}
              />
              <input
                className="input"
                onChange={inputsHandler}
                name="routeLength"
                placeholder="🗺 Длина маршрута"
                value={distance}
              />
            </form>
          </div>
          <button onClick={submitHandler} className="btnEdite">
            РЕДАКТИРОВАТЬ
          </button>
        </div>
        <div className="map">
          <Map
            duration={duration}
            setDuration={setDuration}
            distance={distance}
            setDistance={setDistance}
            wayPointsOnMap={wayPointsOnMap}
            setWayPointsOnMap={setWayPointsOnMap}
          />
        </div>
      </div>
    </div>
  );
}
