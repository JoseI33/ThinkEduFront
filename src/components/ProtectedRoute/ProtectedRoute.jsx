import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.removeItem("token"); 
        return <Navigate to="/" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return <Navigate to="/" replace />;
        }

        return <Outlet />; // Render the protected content
    } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;
