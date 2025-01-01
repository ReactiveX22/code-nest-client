import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from './icons/Icons';

const ThemeSwitcher = () => {
  const { currentTheme, switchTheme, themes } = useTheme();

  return (
    <button
      onClick={() =>
        switchTheme(currentTheme === themes[0] ? themes[1] : themes[0])
      }
      className='flex items-center justify-center rounded-md px-4 py-2 transition-all duration-300 hover:bg-bg-800'
    >
      {currentTheme === themes[0] ? (
        <SunIcon size={24} />
      ) : (
        <MoonIcon size={24} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
