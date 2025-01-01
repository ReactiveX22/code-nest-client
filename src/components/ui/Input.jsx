const Input = ({ type, name, placeholder, register, errors, validation }) => {
  return (
    <div className='w-full'>
      <input
        type={type}
        name={name}
        className={`w-full border-b border-bg-700 bg-transparent px-2 py-3 text-lg outline-none autofill:!bg-bg-800 ${errors[name] ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {errors[name] && (
        <p className='text-sm text-red-500'>{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default Input;
