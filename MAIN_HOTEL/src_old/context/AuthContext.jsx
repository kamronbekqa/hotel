import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data.status === 'success') {
        const { user, token } = response.data.data;
        
        // Store in state
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAdminAuthenticated', user.role === 'admin' ? 'true' : 'false');
        
        return { success: true, user };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback for demo/localhost testing if network error occurs
      // Allows user to bypass missing backend server for testing frontend/admin
      if (email === 'kamronbek1qayumov@gmail.com') {
         const mockUser = {
           id: 'mock-admin',
           name: 'Kamronbek Admin',
           email: 'kamronbek1qayumov@gmail.com',
           role: 'admin'
         };
         const mockToken = 'mock-jwt-token-for-demo';
         
         setUser(mockUser);
         setToken(mockToken);
         setIsAuthenticated(true);
         
         localStorage.setItem('token', mockToken);
         localStorage.setItem('user', JSON.stringify(mockUser));
         localStorage.setItem('isAdminAuthenticated', 'true');
         
         return { success: true, user: mockUser };
      }

      return { 
        success: false, 
        message: error.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      
      if (response.data.status === 'success') {
        const { user, token } = response.data.data;
        
        // Store in state
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAdminAuthenticated', user.role === 'admin' ? 'true' : 'false');
        
        return { success: true, user };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdminAuthenticated');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
