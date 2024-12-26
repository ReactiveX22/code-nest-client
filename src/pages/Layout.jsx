import { Outlet } from 'react-router-dom';
import { Header } from '../components/navbar/Header';

export default function Layout() {
  return (
    <div className='flex flex-col'>
      <Header />

      <main className='mx-auto w-[1152px]'>
        <div className='mb-16 mt-10 flex flex-col gap-6'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
