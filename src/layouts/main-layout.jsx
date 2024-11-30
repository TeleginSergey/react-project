import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout } from "@consta/uikit/Layout";
import { Button } from "@consta/uikit/Button";
import { User } from "@consta/uikit/User";
import './main-layout.css';

const MainLayout = () => {
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
                        <Button label={<User name={'ФИО'} />} className="nav-button" />
                    </Link>
                    <Link to="/login" className="nav-button button-margin">
                        <Button label={'Вход'} className="nav-button" />
                    </Link>
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
