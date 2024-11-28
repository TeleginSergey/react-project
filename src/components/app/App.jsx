import './App.css';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Responses404} from "@consta/uikit/Responses404";

import MainPage from "../../pages/main-page/MainPage"
import ServicePage from '../../pages/service-page/ServicePage'
import ServiceDetail from "../../pages/service-detail-page/ServiceDetail";
import MainLayout from "../../layouts/main-layout";
import profilePage from "../../pages/profile-page/profilePage";
import loginPage from "../../pages/login-page/loginPage";



const App = () => {
  return (<Theme preset={presetGpnDefault}>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainLayout />}>
          <Route index element={<MainPage />}/>
          <Route path={"/service/:id"} element={<ServiceDetail />}/>
          <Route path={"/services"} element={<ServicePage />}/>
          <Route path={"/profile"} element={<profilePage />}/>
          <Route path={"/login"} element={<loginPage />}/>
        </Route>
        <Route path={'*'} element={<Responses404 />}/>
      </Routes>
    </BrowserRouter>
  </Theme>);
};
export default App;
