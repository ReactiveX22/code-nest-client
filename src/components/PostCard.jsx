import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

export default function PostCard({ id, title, author, content }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.closest('a')) return;

    navigate(`${id}`);
  };

  return (
    <div
      className='group h-[168px] cursor-pointer bg-zinc-900 p-4 transition-all duration-500 hover:bg-zinc-800'
      onClick={handleClick}
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-medium'>{title}</h1>
          <div className='flex justify-between gap-1 text-sm text-zinc-400'>
            <Link
              to={`/users/${author.id}`}
              className='z-50 w-fit transition-all duration-300 group-hover:text-blue-500'
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
