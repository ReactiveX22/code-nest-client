import DB from '../../db/db';

export default async (req, context) => {
  try {
    const { postId } = context.params;
    const db = await DB();

    const post = db.posts.find((p) => p.id === postId);

    if (!post) {
      return new Response('User not found', { status: 404 });
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
