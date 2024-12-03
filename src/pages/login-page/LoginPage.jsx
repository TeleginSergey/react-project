import React, { useState } from 'react';
import { Informer } from '@consta/uikit/Informer';
import { useNavigate } from 'react-router-dom';

import { saveToken } from "../../store/token";
import './LoginPage.css';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const getUserToken = async (user, pass) => {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: pass,
          expiresInMins: 60,
        }),
      });

      if (!response.ok) {
        throw new Error('Неверные данные пользователя!');
      }

      const { accessToken } = await response.json();
      return accessToken;
    };

    try {
      const token = await getUserToken(username, password);
      saveToken(token);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={onFormSubmit} className="login-form">
        <div style={{ marginBottom: '16px', width: '500px'}}>
          <label htmlFor="username">Логин:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите логин"
          />
        </div>

        <div style={{ marginBottom: '16px', width: '500px'}}>
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>

        {error && (
          <div className="informer">
            <Informer status="alert" view="filled" title="Ошибка" label={error} />
          </div>
        )}

        <div className="submit-button">
          <button type="submit">Вход</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
