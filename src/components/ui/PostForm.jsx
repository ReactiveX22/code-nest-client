import { useForm } from 'react-hook-form';
import FormGroup from '../FormGroup';
import Button from './Button';

const PostForm = ({ title = '', content = '', onSubmit, checkPostContent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-6'>
        <FormGroup errorMessage={errors?.title?.message}>
          <input
            type='text'
            name='title'
            className='line-clamp-1 w-full border-b border-bg-700 bg-transparent py-3 text-2xl outline-none transition-all duration-300 focus:border-primary-500'
            autoFocus
            placeholder='Title'
            defaultValue={title}
            {...register('title', {
              required: { value: true, message: 'Title is required.' },
            })}
          />
        </FormGroup>

        <FormGroup errorMessage={errors?.content?.message}>
          <textarea
            rows={18}
            className='post-textarea w-full'
            placeholder='Write your post here...'
            defaultValue={content}
            name='content'
            {...register('content', {
              required: { value: true, message: 'Content is required.' },
              validate: { hasTenWords: (value) => checkPostContent(value) },
            })}
          ></textarea>
        </FormGroup>

        <div className='flex justify-end'>
          <Button variant='primary' type='submit'>
            Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
