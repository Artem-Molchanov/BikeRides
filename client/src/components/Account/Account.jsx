import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

function Account({ user, fetchParties, route, setRoute, }) {
	const [parties, setParties] = useState([]);
	const [newParty, setNewParty] = useState({
		name: '',
		date: '',
		location: '',
	});
	const [editParty, setEditParty] = useState(null);

	const formatDate = dateString => {
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		const date = new Date(dateString);
		return date.toLocaleDateString('ru-RU', options);
	};

	useEffect(() => {
		if (user.id) {
			axiosInstance
				.get(`${import.meta.env.VITE_API}/parties?userId=${user.id}`)
				.then(res => {
					setParties(res.data.parties || []);
				})
				.catch(err =>
					console.error('Ошибка при загрузке списка вечеринок:', err)
				);
		}
	}, [user]);

	const handleCreate = async () => {
		if (!newParty.name || !newParty.date || !newParty.location) {
			console.error('Заполните все поля перед созданием вечеринки.');
			return;
		}

		try {
			const response = await axiosInstance.post(
				`${import.meta.env.VITE_API}/parties`,
				{
					...newParty,
					userId: user.id,
				}
			);

			fetchParties();

			setParties(prevParties => [...prevParties, response.data]);
			setNewParty({ name: '', date: '', location: '' });
		} catch (error) {
			console.error('Ошибка при создании вечеринки:', error);
		}
	};

	const handleUpdate = async partyId => {
		if (
			!editParty ||
			!editParty.name ||
			!editParty.date ||
			!editParty.location
		) {
			console.error('Заполните все поля перед обновлением вечеринки.');
			return;
		}

		try {
			const response = await axiosInstance.put(
				`${import.meta.env.VITE_API}/parties/${partyId}`,
				editParty
			);
			setParties(prevParties =>
				prevParties.map(party => (party.id === partyId ? response.data : party))
			);
			setEditParty(null);
			fetchParties();
		} catch (error) {
			console.error('Ошибка при обновлении вечеринки:', error);
		}
	};

	const removeItem = async partyId => {
		try {
			await axiosInstance.delete(
				`${import.meta.env.VITE_API}/parties/${partyId}`
			);
			setParties(prevParties =>
				prevParties.filter(party => party.id !== partyId)
			);
			fetchParties();
		} catch (error) {
			console.error('Ошибка при удалении вечеринки:', error);
		}
	};

	return (
		<div>
			<h1>Ваши вечеринки</h1>

			<div>
				<h3>Создать новую свою новую вечеринку</h3>
				<input
					type='text'
					placeholder='Название'
					value={newParty.name}
					onChange={e => setNewParty({ ...newParty, name: e.target.value })}
				/>
				<input
					type='date'
					placeholder='Дата'
					value={newParty.date}
					onChange={e => setNewParty({ ...newParty, date: e.target.value })}
				/>
				<input
					type='text'
					placeholder='Место проведения'
					value={newParty.location}
					onChange={e => setNewParty({ ...newParty, location: e.target.value })}
				/>
				<button onClick={handleCreate}>Создать</button>
			</div>

			{parties.length === 0 ? (
				<div>У вас не запланировано своих вечеринок.</div>
			) : (
				<div>
					{parties
						.filter(party => party)
						.map(item => (
							<div key={item.id}>
								{editParty && editParty.id === item.id ? (
									<div>
										<input
											type='text'
											value={editParty.name || ''}
											onChange={e =>
												setEditParty({ ...editParty, name: e.target.value })
											}
										/>
										<input
											type='date'
											value={editParty.date || ''}
											onChange={e =>
												setEditParty({ ...editParty, date: e.target.value })
											}
										/>
										<input
											type='text'
											value={editParty.location || ''}
											onChange={e =>
												setEditParty({ ...editParty, location: e.target.value })
											}
										/>
										<button onClick={() => handleUpdate(item.id)}>
											Сохранить
										</button>
									</div>
								) : (
									<div>
										<div>Название: {item.name}</div>
										<div>Дата вечеринки: {formatDate(item.date)}</div>
										<div>Место проведения: {item.location}</div>
										<button onClick={() => setEditParty(item)}>Изменить</button>
										<button onClick={() => removeItem(item.id)}>Удалить</button>
									</div>
								)}
							</div>
						))}
				</div>
			)}
		</div>
	);
}

export default Account;
