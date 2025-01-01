import { useNavigate } from 'react-router-dom';
import { updatePost } from '../api/postService';
import { useAuthContext } from '../context/AuthContext';
import { checkPostContent } from './formValidator';
import PostForm from './ui/PostForm';

export default function UpdatePostForm({ id, title, content }) {
  const navigate = useNavigate();

  const { authToken } = useAuthContext();

  async function onSubmit(data) {
    try {
      if (!authToken) {
        throw new Error('User is not authenticated');
      }

      await updatePost({ ...data, id: id }, authToken);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  return (
    <PostForm
      title={title}
      content={content}
      onSubmit={onSubmit}
      checkPostContent={checkPostContent}
    />
  );
}
