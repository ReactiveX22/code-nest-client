// Reusable SvgIcon Component
import PropTypes from 'prop-types';

const SvgIcon = ({
  size = 24,
  filled = false,
  className = '',
  children,
  ...props
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={filled ? 'currentColor' : 'none'}
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`icon ${className}`}
    {...props}
  >
    {children}
  </svg>
);

SvgIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Icon Definitions
export const LoaderIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M12 3a9 9 0 1 0 9 9' />
  </SvgIcon>
);

export const ChevronUpIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M6 15l6 -6l6 6' />
  </SvgIcon>
);

export const ShareIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z' />
  </SvgIcon>
);

export const MessageIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M8 9h8' />
    <path d='M8 13h6' />
    <path d='M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z' />
  </SvgIcon>
);

export const HeartIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
  </SvgIcon>
);

export const CodeIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M8 9l3 3l-3 3' />
    <path d='M13 15h3' />
    <path d='M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z' />
  </SvgIcon>
);

export const SearchIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
    <path d='M21 21l-6 -6' />
  </SvgIcon>
);

export const Logout2 = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2' />
    <path d='M15 12h-12l3 -3' />
    <path d='M6 15l-3 -3' />
  </SvgIcon>
);

export const Login2 = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2' />
    <path d='M3 12h13l-3 -3' />
    <path d='M13 15l3 -3' />
  </SvgIcon>
);
export const XIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M18 6l-12 12' />
    <path d='M6 6l12 12' />
  </SvgIcon>
);

export const SunIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z' />
    <path d='M6.343 17.657l-1.414 1.414' />
    <path d='M6.343 6.343l-1.414 -1.414' />
    <path d='M17.657 6.343l1.414 -1.414' />
    <path d='M17.657 17.657l1.414 1.414' />
    <path d='M4 12h-2' />
    <path d='M12 4v-2' />
    <path d='M20 12h2' />
    <path d='M12 20v2' />
  </SvgIcon>
);

export const MoonIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z' />
    <path d='M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2' />
    <path d='M19 11h2m-1 -1v2' />
  </SvgIcon>
);

export const MenuIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M4 6l16 0' />
    <path d='M4 12l16 0' />
    <path d='M4 18l16 0' />
  </SvgIcon>
);

export const EditIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
    <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
    <path d='M16 5l3 3' />
  </SvgIcon>
);

export const DeleteIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M4 7l16 0' />
    <path d='M10 11l0 6' />
    <path d='M14 11l0 6' />
    <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
    <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
  </SvgIcon>
);

export const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M5 12l-2 0l9 -9l9 9l-2 0' />
    <path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' />
    <path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' />
  </SvgIcon>
);

export const CirclePlusIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
    <path d='M9 12h6' />
    <path d='M12 9v6' />
  </SvgIcon>
);

export const UserIcon = (props) => (
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
    <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
  </SvgIcon>
);
