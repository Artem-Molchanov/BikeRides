import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { useState } from "react";

export default function Reviews({ currentRoute }) {
  const [inputs, setInputs] = useState('');

  const inputsHandler = (e) => {
    // console.log(e.target.value);
    
    
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addReview = async () => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/reviews/${currentRoute.id}`, inputs 
    );

    if (response.status === 200) {
    }
  };

  return (
    <div>
      <div className="boxAddReview">
        <textarea
          onChange={inputsHandler}
          name="description"
          value={inputs?.text}
          className="textReview"
        ></textarea>
        <button  onClick={addReview} className="btnReview">ОСТАВИТЬ ОТЗЫВ</button>
      </div>
      <div>
        <div className="homePage">review</div>
      </div>
    </div>
  );
}
