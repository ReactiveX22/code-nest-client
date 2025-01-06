import { authenticate } from '../../db/authMiddleware.js';
import supabase from '../../db/db.js';

export default async (req, context) => {
  try {
    const { postId: rawPostId } = context.params;
    const postId = parseInt(rawPostId, 10);

    if (isNaN(postId)) {
      return new Response('Invalid postId', { status: 400 });
    }

    if (req.method === 'POST') {
      const authError = await authenticate(req);

      if (authError) {
        return authError;
      }

      const { comment_text } = await req.json();

      if (!comment_text) {
        return new Response('Bad Request: Missing comment text', {
          status: 400,
        });
      }

      const { data, error: fetchError } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          profile_id: req.user.id,
          comment_text: comment_text,
        })
        .select('*');

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      return new Response(JSON.stringify(data[0]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('post_comments')
        .select(
          `
          id,
          post_id,
          comment_text,
          created_at,
          profile:users (
            id,
            username
          )
        `
        )
        .order('created_at', { ascending: false });

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
  path: '/api/comments/:postId',
};
