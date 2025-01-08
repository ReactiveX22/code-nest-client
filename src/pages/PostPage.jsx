import { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { formatDate } from '.././utils/utils';
import { deletePost } from '../api/postService';
import {
  DeleteIcon,
  EditIcon,
  HeartIcon,
  MessageIcon,
} from '../components/icons/Icons';
import { CommentSection } from '../components/interaction/CommentSection';
import { PostInteractionBar } from '../components/interaction/PostInteractionBar';
import { PostInteractions } from '../components/interaction/PostInteractions';
import MarkdownRendererV2 from '../components/markdown/MarkdownRendererV2';
import Button from '../components/ui/Button';
import { ScrollToTopButton } from '../components/ui/ScrollToTopButton';
import { useAuthContext } from '../context/AuthContext';
import { useUserCheck } from '../hooks/useIsSameUser';

export default function PostPage() {
  const { post } = useLoaderData();

  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);

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

  const { authToken } = useAuthContext();

  const { isSameUserForPost } = useUserCheck();

  const isPostAuthor = isSameUserForPost(post);

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
    <div className='relative mx-auto mb-16 flex w-full flex-col gap-6 pb-12 md:w-[840px]'>
      <div className='flex justify-between border-b border-bg-800 pb-4'>
        <div className='flex w-full flex-col gap-3'>
          <h1 className='text-2xl font-semibold md:text-4xl'>{post.title}</h1>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1 text-neutral md:flex-row'>
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
              {/* Likes, Comments */}
              <div className='flex items-center gap-3 text-neutral'>
                <div className='flex items-center gap-1'>
                  <HeartIcon filled={true} size={20} />
                  <div>{likeCount}</div>
                </div>
                <div className='flex items-center gap-1'>
                  <MessageIcon filled={true} size={20} />
                  <div>{commentCount}</div>
                </div>
              </div>
            </div>

            {/* Edit and Delete Buttons */}
            {isPostAuthor && (
              <div className='flex h-full flex-col items-end gap-3 self-end text-primary-400 md:flex-row md:gap-1'>
                <Button
                  variant='ghost'
                  onClick={() => handleEdit(post.id)}
                  size='sm'
                  className='flex items-center gap-1 text-primary-400'
                >
                  <EditIcon size={20} />
                  Edit
                </Button>
                <Button
                  variant='ghost'
                  onClick={() => handleDelete(post.id)}
                  size='sm'
                  className='flex items-center gap-1 text-red-500'
                >
                  <DeleteIcon size={20} />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className='whitespace-pre-line text-pretty text-justify'>
          <MarkdownRendererV2>{post.content}</MarkdownRendererV2>
        </div>
      </div>
      <div>
        <PostInteractions likes={likeCount} comments={commentCount} />
      </div>
      <div>
        <PostInteractionBar
          postId={post.id}
          authToken={authToken}
          setLikeCount={setLikeCount}
        />
      </div>
      <div>
        <CommentSection
          postId={post.id}
          comments={post.comments}
          setCommentCount={setCommentCount}
        />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
