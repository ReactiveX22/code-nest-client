import ProtectedRoute from '../components/ProtectedRoute';
import PropTypes from 'prop-types';

export const ProtectedLayout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

ProtectedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
