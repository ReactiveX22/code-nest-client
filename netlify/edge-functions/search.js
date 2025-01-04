import supabase from '../../db/db.js';

export default async (req, context) => {
  try {
    if (req.method === 'GET') {
      const url = new URL(req.url, `http://${req.headers.host}`);

      const searchQuery = url.searchParams.get('query');

      let query = supabase.from('posts').select('*');

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      if (data.length === 0) {
        return new Response('No posts found', { status: 404 });
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Method Not Allowed', { status: 405 });
  } catch (error) {
    console.error('Error processing the request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/search',
};
