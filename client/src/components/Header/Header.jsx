import { Link, useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../../axiosInstance";

function Header({ user, setUser, title, setTitle, isRegister, setIsRegister }) {
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

  function renameTitleToRoutes() {
    setTitle("Маршруты 🚵🏼‍♀");
  }

  function renameTitleToMain() {
    setTitle("Велопрогулки 🚴🏼");
  }

  function renameTitleToAccount() {
    setTitle("Личный кабинет 🚲");
  }

  function toSignUp() {
    setIsRegister(true);
  }

  function toSignIn() {
    setIsRegister(false);
  }

  return (
    <div className="header">
      <div className="nav">
        {user && user.name ? (
          <div className="auth">
            <Link onClick={renameTitleToAccount} className="auth" to="/account">
              Личный кабинет
            </Link>
            <Link onClick={renameTitleToMain} className="auth" to="/">
              Главная
            </Link>
            <Link onClick={renameTitleToRoutes} className="auth" to="/routes">
              Маршруты
            </Link>
          </div>
        ) : (
          <div className="nav">
            <div>
              <Link onClick={renameTitleToMain} className="auth" to="/">
                Главная
              </Link>
              <Link onClick={renameTitleToRoutes} className="auth" to="/routes">
                Маршруты
              </Link>
            </div>
            <div className="signInUp">
              <Link onClick={toSignIn} className="auth" to="/auth">
                Войти
              </Link>
              <Link onClick={toSignUp} className="auth" to="/auth">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        )}

        {user && user.name ? (
          <div className="avatar">
            <Link className="avatar" to="/account">
              {user.name}
            </Link>
            <Link className="avatar" onClick={signOutHandler}>
              Выйти
            </Link>
          </div>
        ) : (
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
}

export default Header;
