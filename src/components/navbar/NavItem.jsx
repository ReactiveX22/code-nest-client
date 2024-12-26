import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavItem = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className='flex h-full items-center justify-center px-4 py-2 transition-all duration-300 hover:bg-zinc-800'
    >
      <span>{label}</span>
    </NavLink>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
