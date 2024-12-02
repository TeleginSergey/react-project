import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Layout } from "@consta/uikit/Layout";
import { Button } from "@consta/uikit/Button";
import { User } from "@consta/uikit/User";
import './main-layout.css';
import { useDispatch, useSelector } from "react-redux";
import { dropToken, getToken } from "../store/token";
import { setUser } from "../store/store";
import { Text } from "@consta/uikit/Text";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const userToken = getToken();

  useEffect(() => {
    // Если пользователь уже есть, просто заканчиваем загрузку
    if (user) {
      setLoading(false);
      return;
    }

    // Запрашиваем информацию о пользователе
    const fetchUserInfo = async () => {
      if (!userToken) {
        console.error("Токен не найден");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          // Сбрасываем состояние пользователя при ошибке
          dispatch(setUser(null));
          throw new Error("Не удалось загрузить информацию о пользователе");
        }

        const userInfo = await response.json();
        dispatch(setUser(userInfo));
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [dispatch, navigate, user, userToken]);

  const handleLogout = () => {
    dropToken();
    dispatch(setUser(null)); // Сбрасываем пользователя в Redux
    navigate("/login"); // Перенаправляем на страницу логина
  };

  if (loading) {
    return <Text size="l">Загрузка...</Text>;
  }

  return (
    <div>
      <Layout className="main-layout">
        <Layout flex={1} className="button-group">
          <Link to="/" className="nav-button button-margin">
            <Button label={'Главная страница'} className="nav-button" />
          </Link>
          <Link to="/services" className="nav-button button-margin">
            <Button label={'Услуги компании'} className="nav-button" />
          </Link>
        </Layout>
        <Layout flex={0} className="button-group">
          <Link to="/profile" className="nav-button button-margin">
            <Button
              label={
                user ? (
                  <User name={user.firstName} avatarUrl={user.image} />
                ) : (
                  <User name="ФИО" />
                )
              }
              className="nav-button profile-button"
            />
          </Link>
          {!user ? (
            <Link to="/login" className="nav-button button-margin">
              <Button label={'Вход'} className="nav-button" />
            </Link>
          ) : (
            <Button label={'Выход'} className="nav-button button-margin" onClick={handleLogout} />
          )}
        </Layout>
      </Layout>
      <hr className="divider" />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
