import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import Card from "../../components/Card/Card";
import Map from "../../components/MapComponent/Map";

export default function AccountPage({
  user,
  allRoutes,
  setAllRoutes,
  allUsers,
  setCurrentRoute,
  setTitle,
  coord,
  setCoord,
  duration,
  setDuration,
  distance,
  setDistance,
  wayPointsOnMap,
  setWayPointsOnMap,
  setChange,
}) {
  const initialState = {
    name: "",
    info: "",
    locality: "",
  };
  const [inputs, setInputs] = useState(initialState);
  const navigate = useNavigate();

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
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/track`,
      payload
    );
    if (response.status === 200) {
      setInputs(initialState);
      setAllRoutes(response.data);
    }
  };

  const routeUser = allRoutes.filter((el) => el.userId === user.id);

  return (
    <div>
      <div className="dataRout">
        <div>
          <div className="nameInAccount">{user?.name}</div>
          <div className="addNewRout">ДОБАВЛЕНИЕ НОВОГО МАРШРУТА</div>
          <div className="boxFormAdd">
            <form onSubmit={submitHandler} className="form">
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
                onChange={distance}
                name="routeLength"
                placeholder="🗺 Длина маршрута"
                value={distance}
              />
            </form>
          </div>
          <button onClick={submitHandler} className="btnAddNewRout">
            ДОБАВИТЬ МАРШРУТ
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
            coord={coord}
            setCoord={setCoord}
          />
        </div>
      </div>

      <div>
        <div className="addNewRout">МОИ МАРШРУТЫ</div>
        <div className="cardTrack">
          {routeUser.map((route, index) => (
            <Card
              key={index}
              route={route}
              allUsers={allUsers}
              setCurrentRoute={setCurrentRoute}
              setTitle={setTitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
