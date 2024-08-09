// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Auth from './components/Auth/Auth';
// import axiosInstance, { setAccessToken } from './axiosInstance';
// import Account from './components/Account/Account';
// import ItinerariesList from './components/ItinerariesList/ItinerariesList';
// import ItineraryPage from './components/ItineraryPage/ItineraryPage';
// import Map from './components/MapComponent/Map';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import Account from "./components/Account/Account";
import HomePage from "./Pages/HomePage/HomePage";
import RoutesPage from "./Pages/Routes/Routes";
import AccountPage from "./Pages/AccountPage/AccountPage";
import EditRoute from "./Pages/EditPge/EditPage";
import AboutRoute from "./Pages/AboutPage/AboutPage";
import Reviews from "./Pages//ReviewsPage/ReviewsPage";

function App() {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("Велопрогулки 🚴🏼");
  const [allRoutes, setAllRoutes] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentRoute, setCurrentRoute] = useState({});
  const [coord, setCoord] = useState([]);
  const [wayPointsOnMap, setWayPointsOnMap] = useState();
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const [change, setChange] = useState(false);

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
        console.error("Ошибка при обновлении токена:", err);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/track`)
      .then((data) => setAllRoutes(data.data))
      .catch((err) => console.log("Ошибка :", err));
    setChange(false);
  }, [change]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/track/allUsers`)
      .then((data) => setAllUsers(data.data))
      .catch((err) => console.log("Ошибка :", err));
  }, [user]);


  useEffect(() => {
		axiosInstance
			.get(`${import.meta.env.VITE_API}/routes/${currentRoute.id}`)
			.then(data => setCurrentRoute(data.data))
			.catch(err => console.log('Ошибка :', err));
	},[change]);

  return (
		<Router>
			<Header user={user} setUser={setUser} title={title} setTitle={setTitle} />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route
					path='/routes'
					element={
						<RoutesPage
							allRoutes={allRoutes}
							allUsers={allUsers}
							setCurrentRoute={setCurrentRoute}
							setTitle={setTitle}
						/>
					}
				/>
				<Route
					path='/account'
					element={
						<AccountPage
							duration={duration}
							setDuration={setDuration}
							distance={distance}
							setDistance={setDistance}
							wayPointsOnMap={wayPointsOnMap}
							setWayPointsOnMap={setWayPointsOnMap}
							coord={coord}
							setCoord={setCoord}
							user={user}
							allRoutes={allRoutes}
							setAllRoutes={setAllRoutes}
							allUsers={allUsers}
							setCurrentRoute={setCurrentRoute}
							setTitle={setTitle}
							setChange={setChange}
						/>
					}
				/>
				<Route path='/auth' element={<Auth setUser={setUser} />} />
				<Route
					path='/edit'
					element={
						<EditRoute
							allRoutes={allRoutes}
							allUsers={allUsers}
							currentRoute={currentRoute}
							user={user}
							wayPointsOnMap={wayPointsOnMap}
							distance={distance}
							setChange={setChange}
							duration={duration}
							setDuration={setDuration}
							setDistance={setDistance}
							setWayPointsOnMap={setWayPointsOnMap}
							setCurrentRoute={setCurrentRoute}
						/>
					}
				/>
				<Route
					path='/about'
					element={
						<AboutRoute
							allRoutes={allRoutes}
							allUsers={allUsers}
							currentRoute={currentRoute}
							user={user}
							setTitle={setTitle}
							setChange={setChange}
						/>
					}
				/>
				<Route
					path='/reviews'
					element={<Reviews currentRoute={currentRoute} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
