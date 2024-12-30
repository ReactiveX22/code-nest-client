import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Button = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className='rounded bg-bg-800 px-4 py-3 font-medium transition-all duration-300 hover:bg-bg-700'
    >
      {label}
    </NavLink>
  );
};

Button.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
