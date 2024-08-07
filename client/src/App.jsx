import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import axiosInstance, { setAccessToken } from './axiosInstance';
import Account from './components/Account/Account';
import ItinerariesList from './components/ItinerariesList/ItinerariesList';
import ItineraryPage from './components/ItineraryPage/ItineraryPage';

function App() {
	const [user, setUser] = useState({});
	const [parties, setParties] = useState([]);
	const isRegistered = user && !!user.name;

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const res = await axiosInstance.get(
					`${import.meta.env.VITE_API}/tokens/refresh`
				);
				setUser(res.data.user);
				setAccessToken(res.data.accessToken);
			} catch (err) {
				console.error('Ошибка при обновлении токена:', err);
			}
		};

		fetchToken();
	}, []);


	const fetchParties = async () => {
		try {
			const { data } = await axiosInstance.get(
				`${import.meta.env.VITE_API}/all`
			);
			setParties(data.parties || []);
		} catch (err) {
			console.error('Ошибка ', err);
		}
	};


	useEffect(() => {
		axiosInstance
			.get(`${import.meta.env.VITE_API}/all`)
			.then(data => setParties(data.data.parties || []))
			.catch(err => console.log('Ошибка :', err));
	}, []);

	return (
		<Router>
			<Header user={user} setUser={setUser} />
			<Routes>
				<Route
					path='/'
					element={
						<ItinerariesList parties={parties} setParties={setParties} />
					}
				/>
				<Route
					path='/all'
					element={
						<ItinerariesList parties={parties} setParties={setParties} />
					}
				/>
				<Route
					path='/all/:id'
					element={
						<ItineraryPage parties={parties} isRegistered={isRegistered} />
					}
				/>
				<Route
					path='/parties'
					element={<Account user={user} fetchParties={fetchParties} />}
				/>
				<Route path='/auth' element={<Auth setUser={setUser} />} />
			</Routes>
		</Router>
	);
}

export default App;
