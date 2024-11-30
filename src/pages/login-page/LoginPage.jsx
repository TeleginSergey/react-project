import React from "react";
import { Button } from "@consta/uikit/Button";
import './loginPage.css';
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [isLogin, setIsLogin] = React.useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className='block-page'>
        <div className="login-box">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form>
                {isLogin ? (
                    <div className="box-items">
                        <div className="user-box">
                            <label>Username</label>
                            <input type="text" name="username" required="" placeholder="Username" />
                        </div>
                        <div className="user-box">
                            <label>Password</label>
                            <input type="password" name="password" required="" placeholder="Password" />
                        </div>
                        <Button label="Login" view="primary" className="login-button" />
                        <p>
                            Don't have an account? <Link to="#" onClick={toggleForm}>Sign Up</Link>
                        </p>
                    </div>
                ) : (
                    <div className="box-items">
                        <div className="user-box">
                            <label>Username</label>
                            <input type="text" name="Username" required="" placeholder="Username"/>
                        </div>
                        <div className="user-box">
                            <label>Email</label>
                            <input type="email" name="email" required="" placeholder="Email"/>
                        </div>
                        <div className="user-box">
                            <label>Password</label>
                            <input type="password" name="password" required="" placeholder="Password"/>
                        </div>
                        <Button label="Sign Up" view="primary" className="signup-button"/>
                        <p>
                            Already have an account? <Link to="#" onClick={toggleForm}>Login</Link>
                        </p>
                    </div>
                )}
            </form>
        </div>
            </div>
    );
}

export default LoginPage;
