import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import styles from "./Stars.module.css";
import CardReview from "../../components/CardReview/CardReview";

export default function Reviews({
  currentRoute,
  setAllReviews,
  allReviews,
  allUsers,
  user,
}) {
  const reviewsOfOneRoute = allReviews.filter(
    (el) => el.routeId === currentRoute.id
  );

  let heightReviewPage = '100vh'
  if(reviewsOfOneRoute.length > 2) {
    heightReviewPage = '100%'
  }

  const [inputs, setInputs] = useState({ description: "", point: "" });

  const inputsHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addReview = async () => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/reviews/${currentRoute.id}`,
      inputs
    );

    if (response.status === 201) {
      setInputs((prev) => {
        return { description: "", point: "" };
      });
      setAllReviews(response.data);
    }
  };
  

	return (
		<div style={{height: heightReviewPage}}>
      <fieldset className={styles.rating}>
				{[5, 4, 3, 2, 1].map(value => (
					<React.Fragment key={value}>
						<input
							className={styles.rating}
							type='radio'
							id={`star${value}`}
							name='point'
							value={value}
							onChange={inputsHandler}
							checked={inputs.point === String(value)}
						/>
						<label htmlFor={`star${value}`} title={`${value} stars`}>
							&#9733;
						</label>
					</React.Fragment>
				))}
			</fieldset>
			<div className='boxAddReview'>
				<textarea
					onChange={inputsHandler}
					name='description'
					value={inputs.description}
					className='textReview'
          placeholder='Оставьте ваш отзыв...'
          ></textarea>
				<button onClick={addReview} className='btnReview'>
					ОСТАВИТЬ ОТЗЫВ
				</button>
			</div>
			<div>
      <div className="cardTrack">
          {reviewsOfOneRoute.map((oneReview, index) => (
            <CardReview
              key={index}
              oneReview={oneReview}
              allUsers={allUsers}
              user={user}
              setAllReviews={setAllReviews}
            />
          ))}
        </div>
			</div>
		</div>
	);
}
