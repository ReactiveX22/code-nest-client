import { getUserById } from './userService';

import config from './config';

const postURL = config.baseURL + 'posts/';

export async function getPostById(postId) {
  const response = await fetch(postURL + postId);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const postData = await response.json();
  const author = await getUserById(postData.author);

  const post = {
    ...postData,
    createdAt: postData.created_at,
    updatedAt: postData.updated_at,
    author: {
      ...author,
    },
  };

  return post;
}

export async function getPostsByUserId(userId) {
  const response = await fetch(postURL);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const allPostData = await response.json();

  const userPosts = await Promise.all(
    allPostData
      .filter((postData) => postData.author === userId)
      .map(async (postData) => {
        const author = await getUserById(postData.author);

        return {
          ...postData,
          createdAt: postData.created_at,
          updatedAt: postData.updated_at,
          author: { ...author },
        };
      })
  );

  return userPosts;
}

export async function getAllPosts() {
  const response = await fetch(postURL);

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const allPostData = await response.json();

  const allPosts = await Promise.all(
    allPostData.map(async (postData) => {
      const author = await getUserById(postData.author);

      return {
        ...postData,
        createdAt: postData.created_at,
        updatedAt: postData.updated_at,
        author: { ...author },
      };
    })
  );

  return allPosts;
}

export async function createPost(data, token) {
  const response = await fetch(postURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      author: data.author,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
}

export async function updatePost(data, token) {
  const response = await fetch(postURL + data.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update post');
  }

  return response.json();
}

export async function deletePost(postId, token) {
  const response = await fetch(postURL + postId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  return response.json();
}

export async function searchPosts(query) {
  const response = await fetch('search?query=' + encodeURIComponent(query));

  if (!response.ok) {
    throw new Error('Failed to search posts');
  }

  const searchResults = await response.json();

  const posts = await Promise.all(
    searchResults.map(async (postData) => {
      const author = await getUserById(postData.author);

      return {
        ...postData,
        createdAt: postData.created_at,
        updatedAt: postData.updated_at,
        author: { ...author },
      };
    })
  );

  return posts;
}

export async function likePost(postId, token) {
  const response = await fetch(config.baseURL + 'like/' + postId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to like post');
  }

  return response.json();
}

export async function isLikedPost(postId, token) {
  const response = await fetch(config.baseURL + 'like/' + postId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
}
