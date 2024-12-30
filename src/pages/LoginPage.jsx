import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage = () => {
  return (
    <div className='flex w-full flex-col items-center gap-8'>
      <div className='flex w-full flex-col gap-8 rounded-md bg-bg-900 p-6 md:max-w-[380px]'>
        <h1 className='text-2xl'>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};
