import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../utils/axios.js';
import { useDispatch } from 'react-redux';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { authUser } from '../../features/auth/auth.js';
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Form = () => {
    const [passwordView, setPasswordView] = useState(false);
    const [passwordAgainView, setPasswordAgainView] = useState(false); // Separate password toggle for 'passwordAgain'
    const location = useLocation();
    const loginPage = location.pathname === '/login';

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { passwordAgain, ...other } = data;
        const url = loginPage ? '/login' : '/register';

        axios.post(url, other)
            .then((res) => {
                if (res && res.data) {
                    dispatch(authUser({
                        user: res.data,
                        token: res.data.token || null,
                    }));
                    toast.success(loginPage ? "Login successful!" : "Registration successful!");
                    navigate('/');
                } else {
                    throw new Error("Unexpected server response");
                }
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.message || "An error occurred";
                toast(errorMessage);
            });
    };

    const password = useRef({});
    password.current = watch("password", "");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className="container">
                <div className="form__arrow">
                    <span onClick={() => navigate('/')}><FaArrowCircleLeft /></span>
                    Home
                </div>
                <h1 className="form__title">
                    {loginPage ? 'Login' : 'Register'}
                </h1>
                <div className="form__inputs">
                    {/* Email */}
                    <input
                        {...register('email', { required: "Email is required", pattern: /^[^@]+@[^@]+\.[^@]+$/ })}
                        placeholder='Enter your email'
                        type="email"
                        className="form__inp"
                    />
                    {errors.email && <span className="form__error">{errors.email.message}</span>}

                    {/* Name and Surname (only for Register) */}
                    {!loginPage && (
                        <>
                            <input {...register('name', { required: "Name is required" })} placeholder='Name' type="text" className="form__inp" />
                            {errors.name && <span className="form__error">{errors.name.message}</span>}

                            <input {...register('surname', { required: "Surname is required" })} placeholder='Surname' type="text" className="form__inp" />
                            {errors.surname && <span className="form__error">{errors.surname.message}</span>}
                        </>
                    )}

                    {/* Password */}
                    <div className="form__block">
                        <input
                            {...register('password', {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })}
                            placeholder='Password'
                            type={passwordView ? "text" : "password"}
                            className='form__password'
                        />
                        <span onClick={() => setPasswordView(prev => !prev)} className="form__icon">
              {passwordView ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
                        {errors.password && <span className="form__error">{errors.password.message}</span>}
                    </div>

                    {/* Repeat Password (only for Register) */}
                    {!loginPage && (
                        <div className="form__block">
                            <input
                                {...register('passwordAgain', {
                                    required: "Please confirm your password",
                                    validate: value => value === password.current || "Passwords do not match"
                                })}
                                placeholder='Repeat password'
                                type={passwordAgainView ? "text" : "password"}
                                className="form__password"
                            />
                            <span onClick={() => setPasswordAgainView(prev => !prev)} className="form__icon">
                {passwordAgainView ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
                            {errors.passwordAgain && <span className="form__error">{errors.passwordAgain.message}</span>}
                        </div>
                    )}

                    {/* Links for Login/Register */}
                    <div className="form__row">
                        {loginPage ? <p className="form__text">Don't have an account?</p> : <p className="form__text">Already have an account?</p>}
                        {loginPage ?
                            <Link className='form__link' to='/register'>Register</Link> :
                            <Link className='form__link' to='/login'>Login now</Link>
                        }
                    </div>

                    {/* Submit Button */}
                    <button className="form__btn">
                        {loginPage ? 'Sign in' : 'Register'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;
