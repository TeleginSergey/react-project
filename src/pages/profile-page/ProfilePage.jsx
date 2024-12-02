import React, { useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { getToken } from "../../store/token";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../store/store";
import './ProfilePage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
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
      } catch (err) {
        setError(err.message || "Произошла ошибка при загрузке данных пользователя");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [dispatch, navigate]);

  if (loading) {
    return <Text className="loading-text" size="l">Загрузка...</Text>;
  }

  if (error) {
    return <Text className="error-text" size="l" view="critical">Ошибка: {error.message}</Text>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="user-info">
          <Text className="user-name">{user.firstName} {user.lastName}</Text>
          <Text className="user-email" view="secondary">{user?.email}</Text>
          <Text className="user-details">Username: {user?.username}</Text>
          <Text className="user-details">Phone: {user?.phone}</Text>
          <Text className="user-details">Age: {user?.age}</Text>
        </div>
        {user.image && (
          <img
            src={user?.image}
            alt="User Profile"
            className="profile-image"
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
