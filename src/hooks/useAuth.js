import { useState } from 'react';
import { login, register } from '../api/authService';
import { useAuthContext } from '../context/AuthContext';
import Cookies from 'js-cookie';

const useAuth = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (credentials) => {
    setError(null);
    setLoading(true);
    try {
      const userData = await login(credentials);

      Cookies.set('authToken', userData.token, {
        secure: true,
        sameSite: 'Strict',
      });
      Cookies.set(
        'user',
        JSON.stringify({
          id: userData.user.id,
          username: userData.user.username,
          email: userData.user.email,
        }),
        { secure: true, sameSite: 'Strict' }
      );

      setUser(userData.user, userData.token);
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

      Cookies.set('authToken', response.token, {
        secure: true,
        sameSite: 'Strict',
      });
      Cookies.set(
        'user',
        JSON.stringify({
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
        }),
        { secure: true, sameSite: 'Strict' }
      );

      setUser(response.user, response.token);
    } catch (err) {
      setError(err.message);
      throw new Error('Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    Cookies.remove('authToken');
    Cookies.remove('user');

    setUser(null, null);
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
