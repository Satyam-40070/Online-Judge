import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch the user data
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/user', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log("Role :",response.data.role);
          setUsername(response.data.username);
          setRole(response.data.role);
        } catch (err) {
          console.error('Failed to fetch user data', err);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated]);



  const API_URL = 'http://localhost:8000';
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true }); // Adjust the URL as needed
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUsername('');
      setRole('');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
