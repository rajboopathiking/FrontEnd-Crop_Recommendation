import React, { useState } from 'react';
import { cancel } from '../constrains/constrain-1';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import "../components/Navbar/Navbar.css";
import useAuthStore from '../components/AuthStore/AuthStore.jsx';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);  // Manages the login/signup toggle
    const [user, setUser] = useState('');          // Username state
    const [passcode, setPasscode] = useState('');  // Password state
    const [error, setError] = useState('');        // State for error message
    const navigate = useNavigate();                 // Initialize useNavigate

    // Accessing Zustand actions directly
    const login = useAuthStore((state) => state.login);
    const signup = useAuthStore((state) => state.register);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const handleAuth = (e) => {
        e.preventDefault();  // Prevent default form submission

        if (isLogin) {
            // Attempt to log in
            const success = login(user, passcode);
            if (success) {
                navigate('/'); // Redirect to home if login is successful
            } else {
                setError('Invalid username or password.'); // Show error message
            }
        } else {
            // Attempt to sign up
            const signupSuccess = signup(user, passcode, user); // Name is the same as username for simplicity
            if (signupSuccess) {
                setError('Account created! You can log in now.'); // Inform user account was created
                setIsLogin(true); // Switch to login mode
            }
        }

        // Optionally clear input fields after action
        setUser('');
        setPasscode('');
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);  // Toggles between login and signup
        setError(''); // Clear error message when switching modes
    };

    return (
        <div className="auth-container p-4 relative flex text-black h-[100vh] justify-center items-center bg-black text-white">
            <div>
                <a href="/">
                    <img src={cancel} className='absolute w-[30px] top-10 right-10' alt="" />
                </a>
            </div>

            {isLogin ? (
                // Login Form
                <div className="login-section border p-10 rounded-2xl " id="nav">
                    <h1 className="font-bold mb-4 text-[20px] text-white">Log in</h1>
                    <form onSubmit={handleAuth}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={user}
                            onChange={(e) => setUser(e.target.value)}  // Correctly set username
                            className="block rounded-2xl font-bold mb-2 p-2 border text-black" // Add text-black class
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}  // Correctly set password
                            className="block text-black mb-4 p-2 rounded-2xl font-bold border" // Add text-black class
                        />
                        <button className="px-5 py-2 bg-blue-500 text-white rounded-2xl font-bold" type="submit">
                            Log in
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Show error message */}
                    </form>
                    <p className="mt-4">
                        <span className='font-bold text-white'>New User?</span>
                        <span onClick={toggleAuthMode} className="hover:cursor-pointer text-blue-500 font-bold ml-2">
                            Sign Up
                        </span>
                    </p>
                </div>
            ) : (
                // Signup Form
                <div className="signup-section border p-10 rounded-2xl" id='nav'>
                    <h1 className="font-bold text-[20px] mb-4 ">Sign Up</h1>
                    <form onSubmit={handleAuth}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={user}
                            onChange={(e) => setUser(e.target.value)} // Set username
                            className="block rounded-2xl font-bold mb-2 p-2 border text-black" // Add text-black class
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)} // Set password
                            className="block rounded-2xl font-bold mb-4 p-2 border text-black" // Add text-black class
                        />
                        <button className="px-5 py-2 bg-green-500 font-bold text-white rounded-2xl" type="submit">
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4">
                        <span className='font-bold text-[white]'>Already have an account?</span>
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
