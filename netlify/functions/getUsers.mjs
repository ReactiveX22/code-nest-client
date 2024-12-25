import DB from '../../db/db';

export default async (req, context) => {
  try {
    const dbData = await DB.get();

    const users = dbData.users || [];

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
