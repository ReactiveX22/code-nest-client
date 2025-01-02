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
          <NavItem onClick={logoutUser} label='Logout' />
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
