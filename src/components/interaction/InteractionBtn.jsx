import { LoaderIcon } from '../icons/Icons';
import Button from '../ui/Button';

export const InteractionBtn = ({ label, icon, onClick, loading }) => {
  return (
    <Button
      variant='ghost'
      onClick={onClick}
      className='flex w-full items-center justify-center rounded-none hover:bg-bg-700'
    >
      <div className='flex w-full flex-1 items-center justify-center gap-2 py-2'>
        {loading ? <LoaderIcon size={24} className='animate-spin' /> : icon}
        <p>{label}</p>
      </div>
    </Button>
  );
};
