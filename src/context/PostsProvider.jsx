import { useState } from 'react';
import PropTypes from 'prop-types';
import PostsContext from './PostsContext';

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
