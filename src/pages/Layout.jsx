import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { BottomNav } from '../components/header/BottomNav';

export default function Layout() {
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='mx-auto h-screen w-full max-w-[1152px] overflow-auto pt-24'>
        <div className='mb-16 flex flex-col gap-6 px-4'>
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
