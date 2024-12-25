import { Outlet, useNavigation } from 'react-router';
import GlobalSpinner from './GlobalSpinner';

export default function AppWrapper() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div>
      {isNavigating && <GlobalSpinner />}
      <Outlet />
    </div>
  );
}
