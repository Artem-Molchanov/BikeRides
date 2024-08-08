import { useState } from "react";
import Map from "../../components/MapComponent/Map";

export default function AboutRoute({
  allRoutes,
  allUsers,
  currentRoute,
  user,
}) {
  return (
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
          <button>ЧИТАТЬ ОТЗЫВЫ</button>
        </div>
        <div className="mapForCard"><Map /></div>
      </div>
    </div>
  );
}
