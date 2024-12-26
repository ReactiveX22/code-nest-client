import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';

export default function Layout() {
  return (
    <div className='flex flex-col'>
      <Header />

      <main className='mx-auto w-full max-w-[1152px]'>
        <div className='mb-16 mt-10 flex flex-col gap-6 px-4'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
