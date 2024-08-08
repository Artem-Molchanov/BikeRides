// import Btn from "../Btn/Btn";
// import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Card({ route, allUsers, setCurrentRoute, setTitle }) {
    const navigate = useNavigate();
    async function showCardRoute() {
      navigate("/about");
      setCurrentRoute(route)
      setTitle(`Маршрут “${route.name}”`);
    }

  return (
    <div className="cardRoute">
      <div className="routeName">{`Маршрут "${route.name}"`}</div>
      <div className="authorName">
        Автор: {allUsers.find((el) => el.id === route.userId).name}
      </div>
      <div className="dataInfo">{route.info}</div>
      <div className="cityandkm">
        <div>
          <div className="city">📍 {route.locality}</div>
          <div className="km">🗺 {route.routeLength} км</div>
        </div>
        <div>
            <button onClick={showCardRoute} className="btnCardRout">ПОДРОБНОСТИ МАРШРУТА И КАРТА</button>
        </div>
      </div>
    </div>
  );
}
