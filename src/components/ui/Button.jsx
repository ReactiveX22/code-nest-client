import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Button = ({
  variant = 'primary',
  size = 'md',
  onClick,
  to,
  children,
  className = '',
}) => {
  const baseClass =
    'inline-block font-semibold text-center duration-300 transition-all rounded-md';

  const variantClass = {
    primary: 'bg-primary-500 text-white hover:bg-primary-400',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-400',
    ghost: 'bg-transparent text-text-100 hover:bg-bg-700',
  };

  const sizeClass = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const buttonClass = twMerge(
    baseClass,
    variantClass[variant],
    sizeClass[size],
    className
  );

  if (to) {
    return (
      <NavLink to={to} className={buttonClass}>
        {children}
      </NavLink>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
