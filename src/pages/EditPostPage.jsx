import { useLoaderData } from 'react-router-dom';
import UpdatePostForm from '../components/UpdatePostForm';

export default function EditPostPage() {
  const { post } = useLoaderData();
  return (
    <div className='mx-auto flex w-full flex-col gap-6 md:w-[840px]'>
      <div>
        <UpdatePostForm {...post} />
      </div>
    </div>
  );
}
