import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ItinerariesList.module.css';

function ItinerariesList ({ parties }) {
	// const formatDate = dateString => {
	// 	const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
	// 	const date = new Date(dateString);
	// 	return date.toLocaleDateString('ru-RU', options);
	// };

	return (
		<div className={styles.container}>
			{parties.map(party => (
				<div key={party.id} className={styles.card}>
					<Link to={`/all/${party.id}`}>
						<h2>{party.name}</h2>
						<p>Дата проведения: {formatDate(party.date)}</p>
						<p>Место проведения: {party.location}</p>
						<p>Организатор: {party.user ? party.user.name : 'Неизвестен'}</p>
					</Link>
					<div className={styles.registrations}>
						<h3>Участники:</h3>
						{party.registrations && party.registrations.length > 0 ? (
							<div>
								{party.registrations.map((registration, index) => (
									<div key={index}>
										<p>Имя: {registration.user.name}</p>
										<p>Принесет с собой: {registration.item}</p>
									</div>
								))}
							</div>
						) : (
							<p>Нет зарегистрированных участников</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default ItinerariesList;
