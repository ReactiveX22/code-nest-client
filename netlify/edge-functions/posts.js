import jwt from 'jsonwebtoken';
import supabase from '../../db/db.js';

export default async (req) => {
  try {
    if (req.method === 'POST') {
      const token = req.headers.get('Authorization')?.split(' ')[1];

      if (!token) {
        return new Response('Unauthorized: No token provided', {
          status: 401,
        });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

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
      } catch (err) {
        return new Response('Something went wrong.', {
          status: 401,
        });
      }
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        throw new Error(error.message);
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
  path: '/api/posts',
};
