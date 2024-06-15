import React, { createContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


export const AuthContext = createContext();
const AuthGuardHook = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const navigate = useNavigate();
    useEffect(() => {
        // Kiểm tra token khi khởi tạo
        const token = localStorage.getItem('accessToken');
        if (token) {
        //   const isValid = checkTokenExpiration();
          setIsAuthenticated(true);
        //   if (!isValid) {
        //     removeTokenFromLocalStorage();
        //   }
        }
      }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthGuardHook

export const useAuthGuard = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };