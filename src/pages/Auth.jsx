import React, { useState } from 'react';
import {cancel} from '../constrains/constrain-1';
import "../components/Navbar/Navbar.css"
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);  // Manages the login/signup toggle

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);  // Toggles between login and signup
    };

    return (
        <div className="auth-container p-4 relative flex h-[100vh] justify-center items-center bg-black text-white">
            <div>
                <a href="/">
                    <img src={cancel} className='absolute w-[30px] top-10 right-10' alt="" />
                </a>
            </div>

            {isLogin ? (
                // Login Form
                <div className="login-section  border p-10 rounded-2xl " id="nav">
                    <h1 className="font-bold mb-4 text-[20px]">Log in</h1>
                    <form>
                        <input type="text" placeholder="Username" className="block rounded-2xl font-bold mb-2 p-2 border" />
                        <input type="password" placeholder="Password" className="block mb-4 p-2 rounded-2xl font-bold border" />
                        <button className="px-5 py-2 bg-blue-500 text-white rounded-2xl font-bold">Log in</button>
                    </form>
                    <p className="mt-4">
                        <span className='font-bold'>New User ?</span>
                        <span onClick={toggleAuthMode} className="hover:cursor-pointer text-blue-500 font-bold ml-2">
                            Sign Up
                        </span>
                    </p>
                </div>
            ) : (
                // Signup Form
                <div className="signup-section border p-10 rounded-2xl" id='nav'>
                    <h1 className="font-bold text-[20px] mb-4 ">Sign Up</h1>
                    <form>
                        <input type="text" placeholder="Username" className="block rounded-2xl font-bold mb-2 p-2 border" />
                        <input type="password" placeholder="Password" className="block rounded-2xl font-bold mb-4 p-2 border" />
                        <button className="px-5 py-2 bg-green-500 font-bold  text-white rounded-2xl">Sign Up</button>
                    </form>
                    <p className="mt-4">
                        <span className='font-bold'>Already have an account?</span>
                        <span onClick={toggleAuthMode} className="hover:cursor-pointer text-blue-500 font-bold ml-2">
                            Login
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Auth;
