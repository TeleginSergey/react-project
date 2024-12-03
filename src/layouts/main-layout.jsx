import React, { useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/Layout";
import { Button } from "@consta/uikit/Button";
import { User } from "@consta/uikit/User";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { dropToken, getToken } from "../store/token";
import { setUser } from "../store/store";
import './main-layout.css';

const MainLayout = () => {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user) || {};

  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("home");
  const userToken = getToken();

  useEffect(() => {
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
          throw new Error("Не удалось загрузить информацию о пользователе");
        }

        const userInfo = await response.json();
        dispatch(setUser(userInfo));
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error.message);
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    };

    if (!user.firstName) {
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, [dispatch, user, userToken]);

  const handleLogout = () => {
    dropToken();
    dispatch(setUser({'firstName': 'Гость'}));
    navigate("/login", { replace: true });
  };

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };

  if (loading) {
    return <Text size="l">Загрузка...</Text>;
  }

  return (
    <div>
      <div className={'page-container'}>
        <Layout className="header-layout">
          <Layout flex={1} className="button-group">
            <Link to="/" className="nav-button button-margin" onClick={() => handleNavClick("home")}>
              <Button label={'Главная страница'} className={`nav-button ${activeNav === "home" ? "active" : ""}`} />
            </Link>
            <Link to="/services" className="nav-button button-margin" onClick={() => handleNavClick("services")}>
              <Button label={'Услуги компании'} className={`nav-button ${activeNav === "services" ? "active" : ""}`} />
            </Link>
          </Layout>
          <Layout flex={0} className="button-group">
            <Link to="/profile" className="nav-button button-margin">
              <Button
                label={
                    <User name={user.firstName} avatarUrl={user.image} />
                }
                className="nav-button profile-button"
              />
            </Link>

            {userToken ? (
              <Button label={'Выход'} className="nav-button button-margin" onClick={handleLogout} />
            ) : (
              <Link to="/login" className="nav-button button-margin" onClick={() => handleNavClick("login")}>
                <Button label={'Вход'} className={`nav-button ${activeNav === "login" ? "active" : ""}`} />
              </Link>
            )}
          </Layout>
        </Layout>

        <hr className="divider" />

        <main>
          <Outlet />
        </main>
      </div>
      <div>
        <footer className="footer">
          <Layout className="footer-layout" justify="between">
            <div className="footer-buttons">
              <Link to="/" className="button-margin" onClick={() => handleNavClick("home")}>
                <Button label={'Главная страница'} className={`nav-button ${activeNav === "home" ? "active" : ""}`} />
              </Link>
              <Link to="/services" className="nav-button button-margin" onClick={() => handleNavClick("services")}>
                <Button label={'Услуги компании'} className={`nav-button ${activeNav === "services" ? "active" : ""}`} />
              </Link>
            </div>
            <Text size="m" className="footer-text">©️ {currentDate.getFullYear()} Моя компания</Text>
          </Layout>
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;
