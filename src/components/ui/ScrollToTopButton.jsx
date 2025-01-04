import { useEffect, useState } from 'react';
import { ChevronUpIcon } from '../icons/Icons';
import Button from './Button';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollableElement = document.querySelector('main');

    if (!scrollableElement) return;

    const toggleVisibility = () => {
      if (scrollableElement.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    scrollableElement.addEventListener('scroll', toggleVisibility);

    return () => {
      scrollableElement.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const scrollableElement = document.querySelector('main');
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          variant='ghost'
          size='md'
          className='fixed bottom-20 right-6 z-50 rounded-full border border-bg-700 bg-bg-700 px-3 py-3 shadow-sm lg:right-12 xl:right-52'
        >
          <ChevronUpIcon size={24} />
        </Button>
      )}
    </>
  );
};
