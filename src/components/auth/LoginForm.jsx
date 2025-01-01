import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import FormGroup from '../FormGroup';
import Input from '../ui/Input';
import Button from '../ui/Button';

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
          <Input
            type='email'
            name='email'
            placeholder='Email'
            register={register}
            errors={errors}
            validation={{
              required: { value: true, message: 'Email is required.' },
            }}
          />
        </FormGroup>
        <FormGroup errorMessage={errors?.password?.message}>
          <Input
            type='password'
            name='password'
            placeholder='Password'
            register={register}
            errors={errors}
            validation={{
              required: { value: true, message: 'Password is required.' },
            }}
          />
        </FormGroup>
        <div className='flex justify-end'>
          <Button variant='primary' type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
        <p className='text-center'>
          New to CodeNest? {''}
          <span>
            <NavLink to='/register' className='text-secondary-500'>
              Register
            </NavLink>
          </span>
        </p>
        {error && <p className='mt-2 text-red-500'>{error}</p>}
      </div>
    </form>
  );
};
