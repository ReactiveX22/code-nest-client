import Button from '../ui/Button';

export const NavItem = ({ to, label }) => {
  return (
    <Button to={to} variant='ghost' size='md'>
      {label}
    </Button>
  );
};
