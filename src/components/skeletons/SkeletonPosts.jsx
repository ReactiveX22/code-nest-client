export default function SkeletonPosts() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className='bg-bg-900 h-[168px] p-4 motion-safe:animate-pulse'
        >
          <div className='flex h-full flex-col justify-between gap-4'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-lg font-medium'>
                <span className='bg-bg-800 block h-6 w-3/4'></span>
              </h1>
              <h3 className='w-20'>
                <span className='bg-bg-800 block h-4 w-3/4'></span>
              </h3>
            </div>
            <p className='flex h-14 flex-col gap-1'>
              <span className='bg-bg-800 block h-6'></span>
              <span className='bg-bg-800 block h-6'></span>
              <span className='bg-bg-800 block h-6 w-1/4'></span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
