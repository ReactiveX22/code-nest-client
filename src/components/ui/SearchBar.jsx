import { SearchIcon } from '../icons/Icons';

export const SearchBar = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSubmit,
  className = '',
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full items-center self-end overflow-clip rounded-full border border-bg-700 pl-2 shadow-sm lg:w-1/2 ${className}`}
    >
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className='w-full bg-transparent px-4 py-2 placeholder:text-neutral focus:outline-none'
      />
      <button type='submit' className='bg-bg-700 px-6 py-3 focus:outline-none'>
        <SearchIcon size={20} className='text-neutral' />
      </button>
    </form>
  );
};
