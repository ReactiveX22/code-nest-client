import DB from '../../db/db';

export default async (req, context) => {
  const { userId } = context.params;

  try {
    const db = await DB();

    const users = db.users || [];

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading db.json:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/users',
};
