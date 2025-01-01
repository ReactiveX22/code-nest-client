import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postService';
import { useAuthContext } from '../context/AuthContext';
import { checkPostContent } from './formValidator';
import PostForm from './ui/PostForm';

export default function CreatePostForm() {
  const navigate = useNavigate();
  const { user, authToken } = useAuthContext();

  async function onSubmit(data) {
    try {
      await createPost({ ...data, author: user.id }, authToken);
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  return <PostForm onSubmit={onSubmit} checkPostContent={checkPostContent} />;
}
