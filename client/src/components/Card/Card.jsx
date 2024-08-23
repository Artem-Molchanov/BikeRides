// import Btn from "../Btn/Btn";
import axiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Card({
  route,
  allUsers,
  setCurrentRoute,
  setTitle,
  user
}) {
  const navigate = useNavigate();
  const [averageScore, setAverageScore] = useState(null);

  async function showCardRoute() {
    navigate("/about");
    setCurrentRoute(route);
    setTitle(`Маршрут “${route?.name}”`);
  }
  //получение среднего балла за маршрут
  useEffect(() => {
    async function fetchScores() {
    //   console.log(route.id);

      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API}/scores/route/${route.id}`
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

//   console.log(averageScore);

  return (
    <div className="cardRoute">
      <div className="boxWithGrade">
        <div className="routeName">{`Маршрут "${route.name}"`}</div>
        <div className="grade">{averageScore}</div>
      </div>

      <div className="authorName"> Средняя оценка маршрута: {averageScore}</div>
      <div className="authorName">
        Автор: {allUsers.find((el) => el.id === route.userId).name}
      </div>
      <div className="dataInfo">{route.info}</div>
      <div className="cityandkm">
        <div>
          <div className="city">📍 {route.locality}</div>
          <div className="km">🗺 {route.routeLength}</div>
        </div>
        <div>
          {user && (
            <button onClick={showCardRoute} className="btnCardRout">
            ПОДРОБНОСТИ МАРШРУТА И КАРТА
          </button>
          )}
          
        </div>
      </div>
    </div>
  );
}
