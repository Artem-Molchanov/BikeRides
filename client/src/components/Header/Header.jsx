import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Header.module.css';

function Header({ user, setUser }) {
	const navigate = useNavigate();

	const signOutHandler = async () => {
		try {
			const response = await axiosInstance.get(
				`${import.meta.env.VITE_API}/auth/signout`
			);
			if (response.status === 200) {
				setUser({});
				setAccessToken('');
				navigate('/');
			}
		} catch (error) {
			console.error('Ошибка при выходе:', error);
		}
	};

	return (
		<header className={styles.header}>
			<div>
				<Link to='/' className={styles.logo}>
					<p>Велопрогулки</p>
				</Link>
			</div>
			<nav className={styles.nav}>
				{user && user.name ? (
					<>
						<span className={styles.welcome}>
							Добро пожаловать, {user.name}!
						</span>
						{user.name === 'admin' && (
							<Link to='/admin' className={styles.adminLink}>
								ЛК админа
							</Link>
						)}
							
						<Link to='/parties' className='cart'>
							Ваши вечеринки
						</Link>
						<a onClick={signOutHandler} className='exit'>
							Выйти
						</a>
					</>
				) : (
					<Link to='/auth'>Войти / Зарегистрироваться</Link>
				)}
			</nav>
		</header>
	);
}

export default Header;
