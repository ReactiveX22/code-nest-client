import { useEffect } from 'react';
import { usePostsContext } from '../context/PostsContext';
import { getAllPosts } from '../api/postService';

export const usePosts = () => {
  const { setPosts } = usePostsContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setPosts(posts);
      } catch (err) {
        console.error(`Error fetching posts: ${err.message}`);
      }
    };

    fetchPosts();
  }, [setPosts]);

  return;
};
