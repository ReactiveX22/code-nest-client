import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

export default function PostCard({ id, title, author, content }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.closest('a')) return;

    navigate(`/posts/${id}`);
  };

  return (
    <div
      className='group h-[168px] w-full cursor-pointer rounded-lg bg-bg-800 p-4 shadow-md transition-all duration-500 hover:bg-bg-700 md:w-[362px]'
      onClick={handleClick}
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='line-clamp-1 text-lg font-medium'>{title}</h1>
          <div className='flex justify-between gap-1 text-sm text-zinc-400'>
            <Link
              to={`/users/${author.id}`}
              className='w-fit transition-all duration-300 group-hover:text-secondary-500'
            >
              {author.username}
            </Link>
          </div>
        </div>
        <p className='line-clamp-3'>{content}</p>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
