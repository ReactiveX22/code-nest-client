import { Link, Outlet } from 'react-router-dom';
import { NavItem } from '../components/navbar/NavItem';

export default function Layout() {
  return (
    <div className='flex flex-col'>
      <nav className='h-[55px] w-full bg-zinc-900 text-lg'>
        <div className='mx-auto flex h-full w-[1152px] justify-between'>
          <div>
            <Link
              to='/'
              className='flex h-full items-center justify-center py-2 text-2xl font-extralight'
            >
              Code Nest⚡
            </Link>
          </div>
          <div className='flex'>
            <NavItem to='/' label='Home' />
            <NavItem to='/posts' label='Posts' />
            <NavItem to='/create' label='Create Post' />
          </div>
        </div>
      </nav>

      <main className='mx-auto w-[1152px]'>
        <div className='mb-16 mt-10 flex flex-col gap-6'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
