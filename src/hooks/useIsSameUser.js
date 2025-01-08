import { useAuthContext } from '../context/AuthContext';

export const useUserCheck = () => {
  const { user } = useAuthContext();

  const isSameUserForPost = (post) => {
    return user && user.id === post.author.id;
  };

  const isCommentOwner = (comment) => {
    return user && user.id === comment.profileId;
  };

  return { isSameUserForPost, isCommentOwner };
};
