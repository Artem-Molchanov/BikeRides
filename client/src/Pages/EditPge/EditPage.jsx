import { useState } from "react";
import Map from "../../components/MapComponent/Map";
import MapForm from "../../components/MapComponent/MapForm";

export default function EditRoute({ allRoutes, allUsers, currentRoute, user }) {
  const initialState = {
    name: currentRoute.name,
    info: currentRoute.info,
    coordinates: [55.7575079768237, 37.61915426232428],
    routeLength: currentRoute.routeLength,
    locality: currentRoute.locality,
  };
  const [inputs, setInputs] = useState(initialState);
  // const navigate = useNavigate();

  const inputsHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  // console.log(inputs);

  //     const response = await axiosInstance.post(
  //       `${import.meta.env.VITE_API}/track`,
  //       inputs
  //     );
  //     if (response.status === 200) {
  //       setInputs(initialState);
  //       setAllRoutes(response.data);
  //     }
  //   };

  // const routeUser = allRoutes.filter((el) => el.userId === user.id);

  return (
    <div>
      <div className="dataRout">
        <div>
          <div className="nameInAccount">{user.name}</div>
          <div className="addNewRout">ДОБАВЛЕНИЕ НОВОГО МАРШРУТА</div>
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
                value={inputs.routeLength}
              />
            </form>
          </div>
          <button className="btnEdite">РЕДАКТИРОВАТЬ</button>
        </div>
        <div className="map"><MapForm currentRoute={currentRoute} /></div>
      </div>
    </div>
  );
}
