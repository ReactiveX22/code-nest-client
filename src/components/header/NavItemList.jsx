import { useAuthContext } from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';
import { NavItem } from './NavItem';

export const NavItemList = () => {
  const { user } = useAuthContext();
  const { logoutUser } = useAuth();

  return (
    <>
      <NavItem to='/posts' label='Posts' />
      <NavItem to='/create' label='Create Post' />

      {user ? (
        <>
          <NavItem to={`/users/${user.id}`} label='Profile' />
          <button
            onClick={logoutUser}
            className='flex h-full items-center justify-center px-4 py-2 transition-all duration-300 hover:bg-bg-800'
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavItem to='/login' label='Login' />
          <NavItem to='/register' label='Register' />
        </>
      )}
    </>
  );
};
