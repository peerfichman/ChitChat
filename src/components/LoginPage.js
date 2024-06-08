import React from 'react';
import logo from '../img/logo.png'
const LoginPage = () => {
    const handleGoogleLogin = () => {
        window.open(`${process.env.REACT_APP_CHICHAT_API_URL}auth/google`, '_self');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-md flex flex-col items-center">
                <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />
                <button
                    onClick={handleGoogleLogin}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;