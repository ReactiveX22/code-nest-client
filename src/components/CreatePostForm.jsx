import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postService';
import { useAuthContext } from '../context/AuthContext';
import { checkPostContent } from './formValidator';
import PostForm from './ui/PostForm';
import { useState } from 'react';

export default function CreatePostForm() {
  const navigate = useNavigate();
  const { user, authToken } = useAuthContext();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    try {
      await createPost({ ...data, author: user.id }, authToken);
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PostForm
      onSubmit={onSubmit}
      checkPostContent={checkPostContent}
      buttonText={loading ? 'Posting...' : 'Post'}
    />
  );
}
