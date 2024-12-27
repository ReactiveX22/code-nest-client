import { useState } from 'react';
import { login, register } from '../api/authService';
import { useAuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (credentials) => {
    setError(null);
    setLoading(true);
    try {
      const userData = await login(credentials);

      localStorage.setItem('authToken', userData.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: userData.user.id,
          username: userData.user.username,
          email: userData.user.email,
        })
      );

      setUser(userData.user);
    } catch (err) {
      setError(err.message);
      throw new Error('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await register(userData);

      localStorage.setItem('authToken', response.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
        })
      );

      setUser(response.user);
    } catch (err) {
      setError(err.message);
      throw new Error('Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    setUser(null);
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    loading,
    error,
  };
};

export default useAuth;
