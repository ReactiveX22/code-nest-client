import { authenticate } from '../../db/authMiddleware.js';
import supabase from '../../db/db.js';

export default async (req, context) => {
  try {
    const { postId: rawPostId } = context.params;
    const postId = parseInt(rawPostId, 10);

    if (isNaN(postId)) {
      return new Response('Invalid postId', { status: 400 });
    }

    if (req.method === 'GET') {
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
      const authError = await authenticate(req);

      if (authError) {
        return authError;
      }

      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('id, author')
        .eq('id', postId)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (!post) {
        return new Response('Post not found', { status: 404 });
      }

      if (post.author !== req.user.id) {
        return new Response('Forbidden: You cannot delete this post', {
          status: 403,
        });
      }

      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (deleteError) {
        throw new Error(deleteError.message);
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
      const authError = await authenticate(req);

      if (authError) {
        return authError;
      }

      const { title, content } = await req.json();

      if (!title || !content) {
        return new Response('Bad Request: Missing fields', { status: 400 });
      }

      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('id, author')
        .eq('id', postId)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (!post) {
        return new Response('Post not found', { status: 404 });
      }

      if (post.author !== req.user.id) {
        return new Response('Forbidden: You cannot edit this post', {
          status: 403,
        });
      }

      const { data, error } = await supabase
        .from('posts')
        .update({ title, content })
        .eq('id', postId)
        .select('*');

      if (error) {
        throw new Error(error.message);
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
