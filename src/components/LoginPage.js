import React from 'react';
import logo from '../img/logo.png';
const LoginPage = () => {
    const handleGoogleLogin = () => {
        window.open(
            `${process.env.REACT_APP_CHICHAT_API_URL}auth/google`,
            '_self',
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center rounded-lg bg-white p-10 shadow-md">
                <img src={logo} alt="Logo" className="mb-8 h-32 w-32" />
                <button
                    onClick={handleGoogleLogin}
                    className="rounded-full bg-blue-500 px-4 py-2 text-white shadow-md transition duration-300 hover:bg-blue-600">
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
