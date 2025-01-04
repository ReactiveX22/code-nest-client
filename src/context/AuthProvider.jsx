import { useState } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = Cookies.get('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [authToken, setAuthToken] = useState(() => {
    return Cookies.get('authToken');
  });

  const setUserWithStorage = (newUser, newToken) => {
    if (newUser && newToken) {
      Cookies.set(
        'user',
        JSON.stringify({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        }),
        { secure: true, sameSite: 'Strict' }
      );
      Cookies.set('authToken', newToken, { secure: true, sameSite: 'Strict' });
    } else {
      Cookies.remove('user');
      Cookies.remove('authToken');
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
