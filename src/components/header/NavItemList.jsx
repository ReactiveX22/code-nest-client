import { useAuthContext } from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
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
          <Button onClick={logoutUser} variant='ghost' size='md'>
            Logout
          </Button>
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
