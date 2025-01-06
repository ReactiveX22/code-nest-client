import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createComment } from '../../api/commentService';
import { useAuthContext } from '../../context/AuthContext';
import FormGroup from '../FormGroup';
import Button from '../ui/Button';
import Input from '../ui/Input';

export const CommentForm = ({ postId, setCommentCount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { authToken } = useAuthContext();

  async function onSubmit(data) {
    setLoading(true);
    try {
      if (!authToken) {
        navigate('/login');
      }

      await createComment(postId, { ...data }, authToken);
      setCommentCount((prev) => prev + 1);
      navigate(`/posts/${postId}`);
      reset();
      setError(null);
    } catch (error) {
      setError('Error Commenting.');
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      autoComplete='off'
      className='w-full'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex w-full items-center gap-4'>
        <FormGroup errorMessage={errors?.email?.message}>
          <Input
            type='text'
            name='commentText'
            autofill
            placeholder='Write a comment...'
            register={register}
            errors={errors}
            validation={{
              required: { value: true, message: 'A comment is required.' },
            }}
          />
        </FormGroup>
        <div className='flex justify-end'>
          <Button
            variant='primary'
            className='h-fit'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Commenting...' : 'Comment'}
          </Button>
        </div>
      </div>
      {error && <p className='mt-2 text-red-500'>{error}</p>}
    </form>
  );
};
