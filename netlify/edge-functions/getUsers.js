import supabase from '../../db/db.js';

export default async (req, context) => {
  try {
    const { data: users, error } = await supabase.from('users').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/users',
};
