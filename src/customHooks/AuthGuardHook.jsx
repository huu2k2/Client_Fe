import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Tạo AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Giả sử bạn có một hàm để kiểm tra token
            // const isValid = checkTokenExpiration(token);
            const isValid = true; // Tạm thời để isValid là true cho ví dụ
            if (isValid) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('accessToken');
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

// Component bảo vệ route
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated === undefined) {
        return null; // hoặc một spinner loading
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};