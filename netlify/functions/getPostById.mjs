import DB from '../../db/db';

export default async (req, context) => {
  try {
    if (req.method !== 'GET') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const { postId } = context.params;
    const db = await DB();

    const post = db.posts.find((p) => p.id === postId);

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading db.json:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/posts/:postId',
};
