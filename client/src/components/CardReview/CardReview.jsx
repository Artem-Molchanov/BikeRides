import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

export default function CardReview({ oneReview, allUsers, user, setAllReviews }) {
  const navigate = useNavigate();
  // async function showCardRoute() {
  //   navigate("/about");
  // }

  const isAccess = user.id === oneReview.userId;

  const submitHandler = async () => {
    
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API}/reviews/${oneReview.id}`
    );
    if (response.status === 200) {
        setAllReviews(response.data)
    }
  };

  return (
    <div className="cardRoute">
      <div>
        <div>
          <div className="authorName">Отзыв от:</div>
          <div className="from">
            {allUsers.find((el) => el.id === oneReview.userId).name}
          </div>
        </div>
        <div className="desAndDelReview">
        <div className="dataInfo">{oneReview.description}</div>
        {isAccess && (
            <button onClick={submitHandler} className="btnCeleteReview">УДАЛИТЬ</button>
        )}
        </div>
        
      </div>
    </div>
  );
}
