export default function SkeletonPosts() {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className='bg-bg h-[168px] w-full rounded-md bg-bg-800 p-4 shadow-md motion-safe:animate-pulse md:w-[362px]'
        >
          <div className='flex h-full flex-col justify-between gap-4'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-lg font-medium'>
                <span className='block h-6 w-3/4 bg-bg-700'></span>
              </h1>
              <h3 className='w-20'>
                <span className='block h-4 w-3/4 bg-bg-700'></span>
              </h3>
            </div>
            <p className='flex h-14 flex-col gap-1'>
              <span className='block h-6 bg-bg-700'></span>
              <span className='block h-6 bg-bg-700'></span>
              <span className='block h-6 w-1/4 bg-bg-700'></span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
