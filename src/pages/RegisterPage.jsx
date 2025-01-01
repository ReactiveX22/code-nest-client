import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className='flex w-full flex-col items-center gap-8'>
      <div className='flex w-full flex-col gap-8 rounded-md bg-bg-800 p-6 md:max-w-[380px]'>
        <h1 className='text-2xl font-semibold'>Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
};
