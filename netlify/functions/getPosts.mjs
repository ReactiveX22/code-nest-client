import DB from '../../db/db';

export default async (req, context) => {
  try {
    const db = await DB();

    const posts = db.posts || [];

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading db.json:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/posts',
};
