import { useState } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('authToken');
  });

  const setUserWithStorage = (newUser, newToken) => {
    if (newUser && newToken) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        })
      );
      localStorage.setItem('authToken', newToken);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
    setUser(newUser);
    setAuthToken(newToken);
  };

  return (
    <AuthContext.Provider
      value={{ user, authToken, setUser: setUserWithStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
