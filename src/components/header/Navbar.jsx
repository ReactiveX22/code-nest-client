import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Login2, Logout2, MenuIcon } from '../icons/Icons';
import ThemeSwitcher from '../ThemeSwitcher';
import { NavItemList } from './NavItemList';
import { useAuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import Button from '../ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  const { logoutUser } = useAuth();

  return (
    <nav className='relative flex h-full items-center'>
      <div className='flex items-center justify-between'>
        <ThemeSwitcher />
        <Button
          variant='ghost'
          className='lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon size={24} />
        </Button>
      </div>

      {/* Sidebar Menu (Hidden by Default) */}

      <div
        className={`hover:bg-bg fixed right-0 top-[55px] z-50 flex transform flex-col gap-2 rounded-b-md bg-bg-800 px-4 py-2 shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? '-translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <div
          className='flex flex-col space-y-1'
          onClick={() => setIsOpen(!isOpen)}
        >
          {user ? (
            <button
              onClick={logoutUser}
              className='flex h-full items-center justify-center gap-2 px-4 py-2'
            >
              <div>
                <Logout2 />
              </div>
              <div className='text-sm'>Log Out</div>
            </button>
          ) : (
            <NavLink
              to='/login'
              className='flex h-full items-center justify-center gap-2 px-4 py-2'
            >
              <div>
                <Login2 />
              </div>
              <div className='text-sm'>Log In</div>
            </NavLink>
          )}
        </div>
      </div>

      <div className='hidden lg:flex lg:space-x-4'>
        <div className='flex space-x-1'>
          <NavItemList />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
