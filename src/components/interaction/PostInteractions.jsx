export const PostInteractions = ({ likes, comments }) => {
  return (
    <div className='flex items-center space-x-4 text-neutral'>
      <div className='flex items-center space-x-1'>
        <span>{likes}</span>
        <span>Likes</span>
      </div>
      <div className='flex items-center space-x-1'>
        <span>{comments}</span>
        <span>Comments</span>
      </div>
    </div>
  );
};
