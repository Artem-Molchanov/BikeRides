import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import styles from './ItineraryPage.module.css';
import Modal from '../Modal/Modal';

function PartyPage({ parties, isRegistered }) {
	const { id } = useParams();
	const party = parties.find(party => party.id === parseInt(id));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [item, setItem] = useState('');

	if (!party) return <p>Вчеринка не найдена.</p>;


		const formatDate = dateString => {
			const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
			const date = new Date(dateString);
			return date.toLocaleDateString('ru-RU', options);
		};

	const addToSubscriptions = async () => {
		try {
			await axiosInstance.post(`${import.meta.env.VITE_API}/registrations`, {
				partyId: party.id,
				item: item
			});
			setModalMessage('Вы присоединились к вечеринке');
			setIsModalOpen(true);
		} catch (error) {
			console.error('Ошибка при присоединении к вечеринке:', error);
			setModalMessage('Вы уже присоединились к вечеринке');
			setIsModalOpen(true);
		}
	};

	return (
		<div className={styles.container}>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				{modalMessage}
			</Modal>
			<div className={styles.productName}>{party.name}</div>
			<div className={styles.productDescription}>
				Дата проведения: {formatDate(party.date)}
			</div>
			<div className={styles.productDescription}>Локация: {party.location}</div>
			<div className={styles.productDescription}>
				Организатор: {party.user ? party.user.name : 'Неизвестен'}
			</div>

			{isRegistered ? (
				<>
					<div>Добавьте продукт который вы хотите принести на вечеринку</div>
					<input onChange={e => setItem(e.target.value)} />
					<button
						className={styles.addToCartButton}
						onClick={addToSubscriptions}>
						Присоединиться
					</button>
				</>
			) : (
				<div>
					Пожалуйста, войдите в систему чтобы присоединится к вечеринке.
				</div>
			)}
		</div>
	);
}

export default PartyPage;
