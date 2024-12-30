import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Logout2, MenuIcon } from '../icons/Icons';
import ThemeSwitcher from '../ThemeSwitcher';
import { NavItemList } from './NavItemList';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutUser } = useAuth();

  return (
    <nav className='relative flex h-full items-center'>
      <div className='flex h-full items-center justify-between'>
        <ThemeSwitcher />
        <button
          className='flex h-full items-center justify-center px-4 py-2 transition-all duration-300 hover:bg-bg-800 lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className='h-5 w-5 hover:bg-bg-800' />
        </button>
      </div>

      {/* Sidebar Menu (Hidden by Default) */}
      <div
        className={`fixed right-0 top-[55px] z-50 flex transform flex-col gap-2 rounded-b-md bg-bg-950 px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-bg-900 ${
          isOpen ? '-translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <div
          className='flex flex-col space-y-1'
          onClick={() => setIsOpen(!isOpen)}
        >
          <button
            onClick={logoutUser}
            className='flex h-full items-center justify-center gap-2 px-4 py-2'
          >
            <div>
              <Logout2 />
            </div>
            <div className='text-sm'>Log Out</div>
          </button>
        </div>
      </div>

      <div className={`hidden h-full lg:flex lg:space-x-4`}>
        <div className='flex space-x-1'>
          <NavItemList />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
