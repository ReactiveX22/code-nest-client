import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import FormGroup from '../FormGroup';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { registerUser, loading, error } = useAuth();

  async function onSubmit(data) {
    try {
      await registerUser(data);
      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex w-full flex-col gap-6'>
        <FormGroup errorMessage={errors?.username?.message}>
          <input
            type='text'
            name='username'
            className='w-full border-b border-bg-800 bg-transparent px-2 py-3 text-lg outline-none'
            placeholder='Username'
            {...register('username', {
              required: { value: true, message: 'Username is required.' },
            })}
          />
        </FormGroup>
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
            className='rounded bg-bg-800 px-6 py-3 font-medium transition-all duration-300 hover:bg-bg-700'
            disabled={loading}
          >
            {loading ? 'Registering in...' : 'Register'}
          </button>
        </div>
        <p className='text-center'>
          Already registered?{' '}
          <span>
            <NavLink to='/login' className='text-blue-500'>
              Login
            </NavLink>
          </span>
        </p>
        {error && <p className='mt-2 text-center text-red-500'>{error}</p>}
      </div>
    </form>
  );
};
