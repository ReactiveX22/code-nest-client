import { Comment } from './Comment';
import { CommentForm } from './CommentForm';

export const CommentSection = ({ comments, postId, setCommentCount }) => {
  return (
    <div className='mt-4 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>Comments</h1>
      <div className='mb-4 flex flex-col gap-2'>
        {comments.map(({ profileId, username, commentText, date }, index) => (
          <Comment
            key={index}
            profileId={profileId}
            username={username}
            commentText={commentText}
            date={date}
          />
        ))}
      </div>
      <CommentForm postId={postId} setCommentCount={setCommentCount} />
    </div>
  );
};
