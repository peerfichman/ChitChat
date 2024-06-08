import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from "../components/Loading";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading/>;
    }

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;