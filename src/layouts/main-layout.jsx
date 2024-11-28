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
                    <Link to="/">
                        <Button label={'Главная страница'} className="button-margin custom-button" />
                    </Link>
                    <Link to="/services">
                        <Button label={'Услуги компании'} className="button-margin custom-button" />
                    </Link>
                </Layout>
                <Layout flex={0} className="button-group">
                    <Link to="/profile">
                        <Button label={<User name={'ФИО'} />} className="button-margin custom-button" />
                    </Link>
                    <Link to="/login">
                        <Button label={'Вход'} className="button-margin custom-button" />
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
