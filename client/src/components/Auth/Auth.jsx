import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../../axiosInstance";
import styles from "./Auth.module.css";

function Auth({ setUser }) {
  const [inputs, setInputs] = useState({});
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const type = isRegister ? "signup" : "signin";
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/auth/${type}`,
        inputs
      );
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Ошибка аутентификации:", error);
    }
  };

  return (
    <div className="mar">
      <div className={styles.authContainer}>
        <div className={styles.authTitle}>
          {isRegister ? "Регистрация" : "Вход"}
        </div>
        <form onSubmit={submitHandler}>
          {isRegister && (
            <div className={styles.formGroup}>
              <label>Имя:</label>
              <input
                type="text"
                name="name"
                value={inputs.name || ""}
                onChange={changeHandler}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={changeHandler}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={changeHandler}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>
        <button onClick={toggleForm} className={styles.toggleButton}>
          {isRegister
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
