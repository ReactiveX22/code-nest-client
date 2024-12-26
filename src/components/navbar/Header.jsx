import { Link } from 'react-router-dom';
import { NavItem } from './NavItem';
import ThemeSwitcher from '../ThemeSwitcher';

export const Header = () => {
  return (
    <nav className='bg-bg-900 text-text-50 h-[55px] w-full text-lg'>
      <div className='mx-auto flex h-full w-[1152px] justify-between'>
        <div>
          <Link
            to='/'
            className='flex h-full items-center justify-center py-2 text-2xl font-extralight'
          >
            Code Nest⚡
          </Link>
        </div>
        <div className='flex'>
          <ThemeSwitcher />
          <NavItem to='/' label='Home' />
          <NavItem to='/posts' label='Posts' />
          <NavItem to='/create' label='Create Post' />
        </div>
      </div>
    </nav>
  );
};
