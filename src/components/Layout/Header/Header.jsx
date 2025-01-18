import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../features/auth/auth.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.users.user);

    const handleLogout = () => {
        dispatch(logOutUser()); // Reset user state on logout
        navigate('/'); // Redirect to home
    };

    return (
        <header className='header'>
            <div className="container">
                {
                    user ? (
                        <div className="header__btns">
                            <button onClick={handleLogout} className="header__btn">Logout</button>
                        </div>
                    ) : (
                        <div className="header__btns">
                            <Link to={'/register'}>
                                <button className="header__btn">Register</button>
                            </Link>
                            <Link to={'/login'}>
                                <button className="header__btn">Login</button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </header>
    );
};

export default Header;
