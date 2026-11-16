import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = Boolean(user && user?.roles?.includes("ROLE_ADMIN"));
    const isSeller = Boolean(user && user?.roles?.includes("ROLE_SELLER"));
    const location = useLocation();

    // If it's a public-only page (login, register), redirect logged-in users to home
    if (publicPage) {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }

    // If user is not logged in at all, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If route requires admin or seller rights
    if (adminOnly) {
        if (!isAdmin && !isSeller) {
            return <Navigate to="/" replace />;
        }
        if (isSeller && !isAdmin) {
            const sellerAllowedPaths = ["/admin/orders", "/admin/products"];
            const sellerAllowed = sellerAllowedPaths.some(path => 
                location.pathname.startsWith(path)
            );
            if (!sellerAllowed) {
                return <Navigate to="/" replace />;
            }
        }
    }

    // Normal protected route (e.g. /profile, /order-confirm) accessible to all authenticated users
    return <Outlet />;
};

export default PrivateRoute;
