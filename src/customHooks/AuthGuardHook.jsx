import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

// Tạo AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && token.split(".").length === 3) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      sessionStorage.removeItem("token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

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
