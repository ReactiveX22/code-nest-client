import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { PostCardList } from '../components/PostCardList';
import { getPostsByUserId } from '../api/postService';
import SkeletonPosts from '../components/skeletons/SkeletonPosts';

export const UserPage = () => {
  const { user } = useLoaderData();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const posts = await getPostsByUserId(user.id);
        setUserPosts(posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [user]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-2xl font-semibold'>
        Recent Posts by {user.username}
      </div>
      <div className='mb-3 pb-4'>
        {userPosts.length === 0 && <SkeletonPosts />}
        {userPosts.length > 0 && <PostCardList posts={userPosts} />}
      </div>
    </div>
  );
};
