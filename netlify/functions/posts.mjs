import supabase from '../../db/db';

export default async (req, context) => {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        throw new Error(error.message);
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      const { title, content, author } = await req.json();

      if (!title || !content || !author) {
        return new Response('Bad Request: Missing title or content', {
          status: 400,
        });
      }

      const { data, error } = await supabase
        .from('posts')
        .insert([{ title, content, author }])
        .select('*');

      if (error) {
        throw new Error(error.message);
      }

      return new Response(JSON.stringify(data[0]), {
        status: 201,
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
  path: '/api/posts',
};
