import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';
import { Responses404 } from "@consta/uikit/Responses404";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import MainPage from "../../pages/main-page/MainPage";
import ServicePage from '../../pages/service-page/ServicePage';
import ServiceDetailPage from "../../pages/service-detail-page/ServiceDetail";
import MainLayout from "../../layouts/main-layout";
import ProfilePage from "../../pages/profile-page/ProfilePage";
import LoginPage from "../../pages/login-page/LoginPage";
import './App.css';

const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/service/:id" element={<ServiceDetailPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route
            path="*"
            element={
              <Responses404
                actions={
                  <Link to="/">
                    <Button size="m" view="ghost" label="На главное меню" />
                  </Link>
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
