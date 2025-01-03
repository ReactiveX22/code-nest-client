import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { deletePost } from '../api/postService';
import MarkdownRendererV2 from '../components/markdown/MarkdownRendererV2';
import { formatDate } from '.././utils/utils';
import { DeleteIcon, EditIcon } from '../components/icons/Icons';
import { useAuthContext } from '../context/AuthContext';

export default function PostPage() {
  const { post } = useLoaderData();
  const navigate = useNavigate();

  function handleEdit(postId) {
    navigate(`/posts/${postId}/edit`);
  }

  function getReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  }

  const readTime = getReadTime(post.content);

  const { user, authToken } = useAuthContext();

  const sameUser = user && user.id === post.author.id;

  async function handleDelete(postId) {
    try {
      if (!authToken) {
        throw new Error('User is not authenticated');
      }

      await deletePost(postId, authToken);
      navigate('/posts');
    } catch (error) {
      throw new Error(`Failed to Delete Post: ${postId} \n\n ${error}`);
    }
  }

  const createdAt = formatDate(post.createdAt);

  return (
    <div className='mx-auto flex w-full flex-col gap-6 md:w-[840px]'>
      <div className='flex justify-between border-b border-bg-800 pb-4'>
        <div className='flex w-full flex-col gap-3'>
          <h1 className='text-2xl font-semibold md:text-4xl'>{post.title}</h1>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-1 md:flex-row'>
              <Link
                to={`/users/${post.author.id}`}
                className='text-primary-400 transition-all duration-300'
              >
                {post.author.username}
              </Link>
              <div className='hidden text-neutral md:block'>-</div>
              <div className='text-neutral'>{createdAt}</div>
              <div className='hidden text-neutral md:block'>-</div>
              <div className='text-neutral'>{readTime} mins read</div>
            </div>
            {/* Edit and Delete Buttons */}
            {sameUser && (
              <div className='flex h-full flex-col items-end gap-3 self-end text-primary-400 md:flex-row'>
                <button
                  onClick={() => handleEdit(post.id)}
                  className='flex items-center gap-1 text-primary-400 transition-all duration-300'
                >
                  <EditIcon className='h-5 w-5' />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className='flex items-center gap-1 text-red-500 transition-all duration-300'
                >
                  <DeleteIcon className='h-5 w-5' />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='mb-16 pb-12'>
        <div className='whitespace-pre-line text-pretty text-justify'>
          <MarkdownRendererV2>{post.content}</MarkdownRendererV2>
        </div>
      </div>
    </div>
  );
}
