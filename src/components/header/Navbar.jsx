import { useState } from 'react';
import { MenuIcon, XIcon } from '../icons/Icons';
import ThemeSwitcher from '../ThemeSwitcher';
import { NavItemList } from './NavItemList';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='relative flex items-center'>
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
        className={`fixed right-0 top-0 z-50 flex h-full w-3/4 transform flex-col gap-2 bg-bg-900 py-4 transition-transform duration-300 ease-in-out ${
          isOpen ? '-translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <button
          className='mr-2 flex w-fit items-center justify-center self-end px-4 py-2 transition-all duration-300 hover:bg-bg-800 lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          <XIcon className='h-6 w-6' />
        </button>
        <div
          className='flex flex-col space-y-1'
          onClick={() => setIsOpen(!isOpen)}
        >
          <NavItemList />
        </div>
      </div>

      <div className={`hidden lg:flex lg:space-x-4`}>
        <div className='flex space-x-1'>
          <NavItemList />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
