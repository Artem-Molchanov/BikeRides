import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { useEffect, useState } from 'react';

export default function Reviews({ currentRoute }) {
	const [inputs, setInputs] = useState({ description: '', point: ''});

	const inputsHandler = e => {


		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const addReview = async () => {
		const response = await axiosInstance.post(
			`${import.meta.env.VITE_API}/reviews/${currentRoute.id}`,
			inputs
		);

		if (response.status === 201) {
			setInputs(prev => {
				return { description: '', point: '' };
			});
		}
	};

	return (
		<div>
			<div className='boxAddReview'>
				<input onChange={inputsHandler} name='point' value={inputs.point} />
				<textarea
					onChange={inputsHandler}
					name='description'
					value={inputs.description}
					className='textReview'></textarea>
				<button onClick={addReview} className='btnReview'>
					ОСТАВИТЬ ОТЗЫВ
				</button>
			</div>
			<div>
				<div className='homePage'>review</div>
			</div>
		</div>
	);
}
