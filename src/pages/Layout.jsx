import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { BottomNav } from '../components/header/BottomNav';

export default function Layout() {
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='mx-auto mt-[55px] h-screen w-full max-w-[1152px] overflow-auto'>
        <div className='mb-16 mt-10 flex flex-col gap-6 px-4'>
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
