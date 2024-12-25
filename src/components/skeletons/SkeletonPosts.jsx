export default function SkeletonPosts() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {[...Array(12)].map((_, index) => (
        <div key={index} className='h-[168px] animate-pulse bg-zinc-900 p-4'>
          <div className='flex h-full flex-col justify-between gap-4'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-lg font-medium'>
                <span className='block h-6 w-3/4 bg-zinc-800'></span>
              </h1>
              <h3 className='w-20 text-sm text-zinc-400 hover:text-blue-500'>
                <span className='block h-4 w-3/4 bg-zinc-800'></span>
              </h3>
            </div>
            <p className='flex h-14 flex-col gap-1'>
              <span className='block h-6 bg-zinc-800'></span>
              <span className='block h-6 bg-zinc-800'></span>
              <span className='block h-6 w-1/4 bg-zinc-800'></span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
