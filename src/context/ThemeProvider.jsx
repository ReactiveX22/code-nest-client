import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './ThemeContext';

const themes = ['theme-light', 'theme-dark'];

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'theme-dark';
  });

  useEffect(() => {
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(currentTheme);

    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const switchTheme = (theme) => {
    if (themes.includes(theme)) {
      setCurrentTheme(theme);
    } else {
      console.warn(`Theme "${theme}" is not defined.`);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
