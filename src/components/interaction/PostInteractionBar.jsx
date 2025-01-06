import { useEffect, useState } from 'react';
import { isLikedPost, likePost, unlikePost } from '../../api/postService';
import { HeartIcon, MessageIcon, ShareIcon } from '../icons/Icons';
import { InteractionBtn } from './InteractionBtn';
import { useNavigate } from 'react-router-dom';

export const PostInteractionBar = ({ postId, authToken, setLikeCount }) => {
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIsLiked = async () => {
      if (!authToken) {
        return;
      }

      const likedStatus = await isLikedPost(postId, authToken);

      setIsLiked(likedStatus.isLiked);
    };

    fetchIsLiked();
  }, [postId, authToken, navigate]);

  const handleLike = async () => {
    setLoading(true);
    try {
      if (!authToken) {
        navigate('/login');
        throw new Error('User is not authenticated');
      }

      if (isLiked) {
        await unlikePost(postId, authToken);
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
        return;
      }

      await likePost(postId, authToken);
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    const scrollableElement = document.querySelector('main');
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: scrollableElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='flex w-full justify-end self-center rounded-md border border-bg-700'>
      <InteractionBtn
        label='Like'
        icon={<HeartIcon size={24} filled={isLiked} />}
        onClick={handleLike}
        loading={loading}
      />
      <InteractionBtn
        label='Comment'
        icon={<MessageIcon size={24} />}
        onClick={scrollToBottom}
      />
      <InteractionBtn label='Share' icon={<ShareIcon size={24} />} />
    </div>
  );
};
