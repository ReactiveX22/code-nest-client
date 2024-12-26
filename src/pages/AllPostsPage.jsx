import { PostCardList } from '../components/PostCardList';
import SkeletonPosts from '../components/skeletons/SkeletonPosts';
import { usePostsContext } from '../context/PostsContext';
import { usePosts } from '../hooks/usePosts';

export default function AllPostsPage() {
  const { posts } = usePostsContext();
  usePosts();

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-2xl font-semibold'>Recent Posts</div>
      <div>
        {posts.length === 0 && <SkeletonPosts />}
        {posts.length > 0 && <PostCardList posts={posts} />}
      </div>
    </div>
  );
}
