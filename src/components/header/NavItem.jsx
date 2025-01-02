import Button from '../ui/Button';

export const NavItem = ({ to, onClick, label }) => {
  if (to && onClick) {
    throw new Error("Cannot pass both 'to' and 'onClick' props to Button.");
  }

  return (
    <Button
      to={to}
      onClick={onClick}
      variant='ghost'
      className='hover:bg-bg-700'
      size='md'
    >
      {label}
    </Button>
  );
};
