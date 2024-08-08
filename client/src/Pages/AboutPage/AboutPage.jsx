import { useState } from "react";
import Map from "../../components/MapComponent/Map";
import { useNavigate } from "react-router-dom";

export default function AboutRoute({
  allRoutes,
  allUsers,
  currentRoute,
  user,
  setTitle,
}) {

  const navigate = useNavigate();

  function navEdits() {
    navigate('/edit')
  }

  function navReviews() {
    navigate('/reviews')
    setTitle(`Маршрут “${currentRoute.name}” - ОТЗЫВЫ`)
  }

  return (
    <div className="aboutPage">
      <div className="boxForCard">
        <div className="authorName">
          Автор: {allUsers.find((el) => el.id === currentRoute.userId).name}
        </div>
        <div className="dataInfo">{currentRoute.info}</div>
        <div className="flexCard">
          <div>
            <div>
              <div className="city">📍 {currentRoute.locality}</div>
              <div className="km">🗺 {currentRoute.routeLength} км</div>
            </div>
            {currentRoute.userId === user.id ? (
              <div className="btnsAccess">
                <button onClick={navEdits} className="btnEdite">РЕДАКТИРОВАТЬ</button>
                <button className="btnDelete">УДАЛИТЬ</button>
              </div>
            ) : (
              <div className="none"></div>
            )}
            <button onClick={navReviews} className="btnReviews">ЧИТАТЬ ОТЗЫВЫ</button>
          </div>
          <div className="mapForCard">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}
