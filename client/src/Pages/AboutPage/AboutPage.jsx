import { useState } from "react";
import Map from "../../components/MapComponent/Map";
import { useNavigate } from "react-router-dom";
import MapForm from "../../components/MapComponent/MapForm";
import axiosInstance from "../../axiosInstance";
import { useEffect } from "react";

export default function AboutRoute({
  allRoutes,
  allUsers,
  currentRoute,
  user,
  setTitle,
  setChange,
  duration,
  setDuration,
  distance,
  setDistance,
  wayPointsOnMap,
  setWayPointsOnMap,
}) {

  const navigate = useNavigate();
  const [averageScore, setAverageScore] = useState(null);
  //получение среднего балла за маршрут
  useEffect(() => {
    async function fetchScores() {
    //   console.log(route.id);

      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API}/scores/route/${currentRoute.id}`
        );
        const scores = response.data;
        // console.log(response.data);

        if (scores.length > 0) {
          const totalScore = scores.reduce(
            (acc, score) => acc + score.point,
            0
          );
          const average = totalScore / scores.length;
          setAverageScore(average.toFixed(1));
        } else {
          setAverageScore("Нет оценок");
        }
      } catch (error) {
        console.error("Ошибка при получении оценок:", error);
      }
    }

    fetchScores();
  }, []);

  function navEdits() {
    navigate('/edit')
  }

  function navReviews() {
    navigate('/reviews')
    setTitle(`Маршрут “${currentRoute.name}” - ОТЗЫВЫ`)
  }

  const submitHandler = async () => {
    
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API}/routes/${currentRoute.id}`
    );
    if (response.status === 200) {
      setChange(true);
      navigate("/account");
    }
  };
  
  

  return (
    <div className="aboutPage">
      <div className="boxForCard">
        <div className="boxWithGrade">
        <div className="authorName">
          Автор: {allUsers?.find((el) => el.id === currentRoute?.userId).name}
        </div>
        <div className="grade">{averageScore}</div>
        </div>
        <div className="authorName"> Средняя оценка маршрута: {averageScore}</div>
        <div className="dataInfo">{currentRoute.info}</div>
        <div className="flexCard">
          <div>
            <div>
              <div className="city">📍 {currentRoute?.locality}</div>
              <div className="km">🗺 {currentRoute?.routeLength}</div>
            </div>
            {currentRoute?.userId === user.id ? (
              <div className="btnsAccess">
                <button onClick={navEdits} className="btnEdite">РЕДАКТИРОВАТЬ</button>
                <button onClick={submitHandler} className="btnDelete">УДАЛИТЬ</button>
              </div>
            ) : (
              <div className="none"></div>
            )}
            <button onClick={navReviews} className="btnReviews">ЧИТАТЬ ОТЗЫВЫ</button>
          </div>
          <div className="mapForCard">
            <MapForm 
            currentRoute={currentRoute}
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
    </div>
  );
}
