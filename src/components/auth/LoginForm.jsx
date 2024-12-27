import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import FormGroup from '../FormGroup';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { loginUser, loading, error } = useAuth();

  async function onSubmit(data) {
    try {
      await loginUser(data);
      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex w-full flex-col gap-6'>
        <FormGroup errorMessage={errors?.email?.message}>
          <input
            type='email'
            name='email'
            className='w-full border-b border-bg-800 bg-transparent px-2 py-3 text-lg outline-none'
            placeholder='Email'
            {...register('email', {
              required: { value: true, message: 'Email is required.' },
            })}
          />
        </FormGroup>
        <FormGroup errorMessage={errors?.password?.message}>
          <input
            type='password'
            name='password'
            className='w-full border-b border-bg-800 bg-transparent px-2 py-3 text-lg outline-none'
            placeholder='Password'
            {...register('password', {
              required: { value: true, message: 'Password is required.' },
            })}
          />
        </FormGroup>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='border border-bg-700 bg-bg-800 px-4 py-2 font-medium'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <p className='text-center'>
          New to CodeNest? {''}
          <span>
            <NavLink to='/register' className='text-blue-500'>
              Register
            </NavLink>
          </span>
        </p>
        {error && <p className='mt-2 text-red-500'>{error}</p>}
      </div>
    </form>
  );
};
