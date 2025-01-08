import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../../api/commentService';
import { useAuthContext } from '../../context/AuthContext';
import { useUserCheck } from '../../hooks/useIsSameUser';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';

export const CommentSection = ({ comments, postId, setCommentCount }) => {
  const { authToken } = useAuthContext();
  const navigate = useNavigate();
  const { isCommentOwner } = useUserCheck();

  async function handleDelete(commentId) {
    try {
      await deleteComment(postId, commentId, authToken);
      setCommentCount((prev) => prev - 1);
      navigate(`/posts/${postId}`);
    } catch (error) {
      throw new Error(`Failed to Delete Comment: ${commentId} \n\n ${error}`);
    }
  }

  return (
    <div className='mt-4 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>Comments</h1>
      <div className='mb-4 flex flex-col gap-2'>
        {comments.length === 0 ? (
          <p className='text-neutral'>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              isOwner={isCommentOwner(comment)}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
      <CommentForm postId={postId} setCommentCount={setCommentCount} />
    </div>
  );
};
