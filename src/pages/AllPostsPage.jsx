import { PostCardList } from '../components/PostCardList';
import SkeletonPosts from '../components/skeletons/SkeletonPosts';
import { SearchBar } from '../components/ui/SearchBar';
import { usePostsContext } from '../context/PostsContext';
import { useState, useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';

export default function AllPostsPage() {
  const { posts } = usePostsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  usePosts();

  useEffect(() => {
    if (posts.length > 0) {
      setLoading(false);
    }

    const timeout = setTimeout(() => {
      if (posts.length === 0) {
        setTimeoutReached(true);
        setLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [posts]);

  const searchIt = (searchTerm) => {
    const searchResults = posts.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return searchResults;
  };

  const filteredPosts = searchIt(searchTerm);

  return (
    <div className='-mt-4 flex flex-col gap-6'>
      <SearchBar
        placeholder='Search a post...'
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        onSubmit={searchIt}
      />
      <div className='text-2xl font-semibold leading-none'>Recent Posts</div>
      <div className='mb-3 pb-4'>
        {loading && !timeoutReached && <SkeletonPosts />}
        {timeoutReached && filteredPosts.length === 0 && (
          <div className='w-full self-center text-center text-xl font-semibold text-neutral'>
            No posts found
          </div>
        )}
        {filteredPosts.length > 0 && <PostCardList posts={filteredPosts} />}
      </div>
    </div>
  );
}
