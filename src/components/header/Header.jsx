import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { CodeIcon } from '../icons/Icons';

export const Header = () => {
  return (
    <div className='fixed top-0 z-10 h-[55px] w-full text-nowrap bg-bg-900 text-lg shadow-md'>
      <div className='mx-auto flex h-full w-full max-w-[1152px] justify-between px-2'>
        <Link
          to='/'
          className='flex h-full items-center justify-center gap-2 py-2 text-2xl'
        >
          <CodeIcon size={32} className='text-primary-400' />
          <div>Code Nest</div>
        </Link>
        <Navbar />
      </div>
    </div>
  );
};
