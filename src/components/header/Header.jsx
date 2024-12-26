import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export const Header = () => {
  return (
    <div className='bg-bg-900 text-text-50 h-[55px] w-full text-nowrap text-lg'>
      <div className='mx-auto flex h-full max-w-[1152px] justify-between'>
        <div>
          <Link
            to='/'
            className='flex h-full items-center justify-center px-4 py-2 text-2xl font-extralight'
          >
            Code Nest⚡
          </Link>
        </div>
        <Navbar />
      </div>
    </div>
  );
};
