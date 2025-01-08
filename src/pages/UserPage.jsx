import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { PostCardList } from '../components/PostCardList';
import { getPostsByUserId } from '../api/postService';
import SkeletonPosts from '../components/skeletons/SkeletonPosts';

export const UserPage = () => {
  const { user } = useLoaderData();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const posts = await getPostsByUserId(user.id);
        setUserPosts(posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setLoading(false);
      }
    };

    fetchUserPosts();

    const timeout = setTimeout(() => {
      if (userPosts.length === 0) {
        setTimeoutReached(true);
        setLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [user, userPosts.length]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-2xl font-semibold'>
        Recent Posts by {user.username}
      </div>
      <div className='mb-3 pb-4'>
        {loading && !timeoutReached && <SkeletonPosts />}
        {timeoutReached && userPosts.length === 0 && (
          <div className='w-full self-center text-center text-xl font-semibold text-neutral'>
            No posts found
          </div>
        )}
        {userPosts.length > 0 && <PostCardList posts={userPosts} />}
      </div>
    </div>
  );
};
