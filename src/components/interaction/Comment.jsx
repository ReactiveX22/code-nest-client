import { NavLink } from 'react-router-dom';
import { formatDate } from '../../utils/utils';
import { DeleteIcon } from '../icons/Icons';
import Button from '../ui/Button';

export const Comment = ({ comment, isOwner, handleDelete }) => {
  return (
    <div className='flex items-center justify-between gap-1 rounded-md bg-bg-700 p-4 shadow-sm'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <h1 className='text-lg font-semibold transition-all duration-300 hover:text-secondary-500'>
            <NavLink to={`/users/${comment.profileId}`}>
              {comment.username}
            </NavLink>
          </h1>
          <p className='text-sm text-neutral'>{formatDate(comment.date)}</p>
        </div>
        <p className=''>{comment.commentText}</p>
      </div>
      <div>
        {isOwner && (
          <Button
            variant='ghost'
            onClick={() => {
              handleDelete(comment.id);
            }}
            size='sm'
            className='flex items-center gap-1 text-red-500'
          >
            <DeleteIcon size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};
