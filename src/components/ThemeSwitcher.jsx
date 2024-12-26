import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from './icons/Icons';

const ThemeSwitcher = () => {
  const { currentTheme, switchTheme, themes } = useTheme();

  return (
    <button
      onClick={() =>
        switchTheme(currentTheme === themes[0] ? themes[1] : themes[0])
      }
      className='hover:bg-bg-800 flex h-full items-center justify-center px-4 py-2 transition-all duration-300'
    >
      {currentTheme === themes[0] ? (
        <SunIcon className='text-text-50 h-5 w-5' />
      ) : (
        <MoonIcon className='text-text-50 h-5 w-5' />
      )}
    </button>
  );
};

export default ThemeSwitcher;
