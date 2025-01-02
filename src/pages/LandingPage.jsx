import Button from '../components/ui/Button';

export const LandingPage = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex w-fit flex-col justify-center gap-6 pt-12'>
        <div className='group flex flex-col justify-center gap-4 text-5xl font-semibold'>
          <h1 className='inline-flex items-start gap-3'>Welcome to CodeNest</h1>
        </div>
        <div>
          <p className='text-lg'>
            Your Go-To Platform for Coding Tutorials and Articles
          </p>
        </div>
        <div className='pt-6'>
          <Button to='/register' variant='primary'>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};
