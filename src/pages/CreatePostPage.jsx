import CreatePostForm from '../components/CreatePostForm';

export default function CreatePostPage() {
  return (
    <div className='mx-auto flex w-full flex-col gap-6 md:w-[840px]'>
      <div>
        <CreatePostForm />
      </div>
    </div>
  );
}
