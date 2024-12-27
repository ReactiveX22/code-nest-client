import { useState } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUserWithStorage = (newUser) => {
    if (newUser) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        })
      );
    } else {
      localStorage.removeItem('user');
    }
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: setUserWithStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
