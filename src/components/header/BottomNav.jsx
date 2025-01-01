import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { CirclePlusIcon, HomeIcon, UserIcon } from '../icons/Icons';

export const BottomNav = () => {
  const { user } = useAuthContext();

  const navItems = [
    { icon: <HomeIcon size={22} />, id: 1, label: 'Home', to: '/posts' },
    { icon: <CirclePlusIcon size={22} />, id: 2, label: 'Add', to: '/create' },
    {
      icon: <UserIcon size={22} />,
      id: 3,
      label: 'Profile',
      to: user ? `/users/${user.id}` : '/login',
    },
  ];

  return (
    <div className='fixed bottom-0 flex w-full bg-bg-900 shadow-[0_-4px_8px_rgba(0,0,0,0.3)] lg:hidden'>
      {navItems.map((item) => (
        <NavLink
          to={item.to}
          key={item.id}
          className='flex flex-1 flex-col items-center justify-center gap-1 px-4 py-3 text-center transition-all duration-300 hover:bg-bg-800'
        >
          <div>{item.icon}</div>
          <div className='text-xs'>{item.label}</div>
        </NavLink>
      ))}
    </div>
  );
};
