import { useState } from 'react';
import ThemeSwitcher from '../ThemeSwitcher';
import { NavItem } from './NavItem';
import { MenuIcon, XIcon } from '../icons/Icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='relative flex items-center'>
      <div className='flex h-full items-center justify-between'>
        <ThemeSwitcher />
        <button
          className='hover:bg-bg-800 flex h-full items-center justify-center px-4 py-2 transition-all duration-300 lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className='hover:bg-bg-800 h-5 w-5' />
        </button>
      </div>

      {/* Sidebar Menu (Hidden by Default) */}
      <div
        className={`bg-bg-900 fixed right-0 top-0 z-50 flex h-full w-3/4 transform flex-col gap-2 py-4 transition-transform duration-300 ease-in-out ${
          isOpen ? '-translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <button
          className='hover:bg-bg-800 mr-2 flex w-fit items-center justify-center self-end px-4 py-2 transition-all duration-300 lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          <XIcon className='h-6 w-6' />
        </button>
        <div className='flex flex-col' onClick={() => setIsOpen(!isOpen)}>
          <NavItem to='/' label='Home' />
          <NavItem to='/posts' label='Posts' />
          <NavItem to='/create' label='Create Post' />
        </div>
      </div>

      <div className={`hidden lg:flex lg:space-x-4`}>
        <div className='flex space-x-4'>
          <NavItem to='/' label='Home' />
          <NavItem to='/posts' label='Posts' />
          <NavItem to='/create' label='Create Post' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
