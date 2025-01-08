import config from './config';

const commentURL = config.baseURL + 'comments/';

export async function getAllCommentsByPostId(postId) {
  const response = await fetch(commentURL + postId);

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  const comments = await response.json();

  return comments.map(({ id, profile, comment_text, created_at }) => ({
    id: id,
    profileId: profile.id,
    username: profile.username,
    commentText: comment_text,
    date: created_at,
  }));
}

export async function createComment(postId, data, token) {
  const response = await fetch(commentURL + postId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      comment_text: data.commentText,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create comment');
  }

  return response.json();
}

export async function deleteComment(postId, commentId, token) {
  const response = await fetch(commentURL + postId + '/' + commentId, {
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
