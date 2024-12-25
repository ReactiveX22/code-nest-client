import DB from '../../db/db';

export default async (req, context) => {
  try {
    const { userId } = context.params;
    const db = await DB();

    const user = db.users.find((u) => u.id === userId);

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading db.json:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/users/:userId',
};
