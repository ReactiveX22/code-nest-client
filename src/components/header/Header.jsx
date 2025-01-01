import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export const Header = () => {
  return (
    <div className='fixed top-0 z-10 h-[55px] w-full text-nowrap bg-bg-900 text-lg shadow-md'>
      <div className='mx-auto flex h-full w-full max-w-[1152px] justify-between px-2'>
        <div>
          <Link
            to='/'
            className='flex h-full items-center justify-center py-2 text-2xl font-extralight'
          >
            Code Nest⚡
          </Link>
        </div>
        <Navbar />
      </div>
    </div>
  );
};
