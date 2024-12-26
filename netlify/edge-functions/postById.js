import supabase from '../../db/db.js';

export default async (req, context) => {
  try {
    if (req.method === 'GET') {
      const { postId } = context.params;
      const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (!post) {
        return new Response('Post not found', { status: 404 });
      }

      return new Response(JSON.stringify(post), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'DELETE') {
      const { postId } = context.params;

      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .select('*');

      if (error) {
        throw new Error(error.message);
      }

      if (data.length === 0) {
        return new Response('Post not found', { status: 404 });
      }

      return new Response(
        JSON.stringify({ message: 'Post deleted successfully' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (req.method === 'PUT') {
      const { postId } = context.params;
      const { title, content, author } = await req.json();

      if (!title || !content || !author) {
        return new Response('Bad Request: Missing fields', { status: 400 });
      }

      const { data, error } = await supabase
        .from('posts')
        .update({ title, content, author })
        .eq('id', postId)
        .select('*');

      if (error) {
        throw new Error(error.message);
      }

      if (data.length === 0) {
        return new Response('Post not found', { status: 404 });
      }

      return new Response(JSON.stringify(data[0]), {
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
  path: '/api/posts/:postId',
};
