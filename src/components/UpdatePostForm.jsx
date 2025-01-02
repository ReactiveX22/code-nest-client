import { useNavigate } from 'react-router-dom';
import { updatePost } from '../api/postService';
import { useAuthContext } from '../context/AuthContext';
import { checkPostContent } from './formValidator';
import PostForm from './ui/PostForm';
import { useState } from 'react';

export default function UpdatePostForm({ id, title, content }) {
  const navigate = useNavigate();
  const { authToken } = useAuthContext();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    try {
      if (!authToken) {
        throw new Error('User is not authenticated');
      }

      await updatePost({ ...data, id: id }, authToken);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PostForm
      title={title}
      content={content}
      onSubmit={onSubmit}
      checkPostContent={checkPostContent}
      buttonText={loading ? 'Updating...' : 'Update'}
    />
  );
}
