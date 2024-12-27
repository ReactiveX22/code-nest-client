import { NavLink } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex w-fit flex-col justify-center gap-6 pt-12'>
        <div className='group flex cursor-pointer flex-col justify-center gap-4 text-5xl font-semibold'>
          <h1>Welcome</h1>
          <h1 className='flex items-center'>
            to CodeNest
            <div className='animate-pulse group-hover:animate-ping'>⚡</div>
          </h1>
        </div>
        <div>
          <p className='text-lg'>
            Your Go-To Platform for Coding Tutorials and Articles
          </p>
        </div>
        <div className='pt-6'>
          <NavLink
            to='/register'
            className='rounded bg-bg-800 px-4 py-3 font-medium transition-all duration-300 hover:bg-bg-700'
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
  );
};
