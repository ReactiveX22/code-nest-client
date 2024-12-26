import PostCard from './PostCard';

import PropTypes from 'prop-types';

export const PostCardList = ({ posts }) => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

PostCardList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.object.isRequired,
    })
  ).isRequired,
};
