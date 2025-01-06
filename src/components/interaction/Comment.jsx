import { NavLink } from 'react-router-dom';
import { formatDate } from '../../utils/utils';

export const Comment = ({ profileId, username, commentText, date }) => {
  return (
    <div className='flex flex-col gap-1 rounded-md bg-bg-700 p-4 shadow-sm'>
      <div className='flex items-center gap-2'>
        <h1 className='text-lg font-semibold transition-all duration-300 hover:text-secondary-500'>
          <NavLink to={`/users/${profileId}`}>{username}</NavLink>
        </h1>
        <p className='text-sm text-neutral'>{formatDate(date)}</p>
      </div>
      <p className=''>{commentText}</p>
    </div>
  );
};
