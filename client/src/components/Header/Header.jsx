import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../../axiosInstance";
import styles from "./Header.module.css";

function Header({ user, setUser, title, setTitle }) {
  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API}/auth/signout`
      );
      if (response.status === 200) {
        setUser({});
        setAccessToken("");
        navigate("/");
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

<<<<<<< HEAD
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
=======
  function renameTitleToRoutes() {
    setTitle("Маршруты 🚵🏼‍♀");
  }

  function renameTitleToMain() {
    setTitle("Велопрогулки 🚴🏼");
  }

  function renameTitleToAccount() {
    setTitle("Личный кабинет 🚲");
  }

  return (
    <div className="header">
      <div className="nav">
        {user && user.name ? (
          <div className="auth">
            <Link onClick={renameTitleToAccount} className="auth" to="/account">
              Личный кабинет
            </Link>
            <Link className="auth" onClick={signOutHandler}>
              Выйти
            </Link>
          </div>
        ) : (
          <div className="auth">
            <Link className="auth" to="/auth">
              Войти / Зарегистрироваться
            </Link>
          </div>
        )}
        <Link onClick={renameTitleToMain} className="auth" to="/">
          Главная
        </Link>
        <Link onClick={renameTitleToRoutes} className="auth" to="/routes">
          Маршруты
        </Link>
		{user && user.name ? (
			<Link className="avatar" to="/account" >{user.name}</Link>
		):(
			<div></div>
		)}
      </div>
      <div className="logo">
        <div to="/" className="logo">
          {title}
        </div>
        <div className="border"></div>
      </div>
    </div>
  );
>>>>>>> front
}

export default Header;
