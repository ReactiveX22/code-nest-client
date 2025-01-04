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
      const authError = await authenticate(req);

      if (authError) {
        return authError;
      }

      const { data: liked, error: likeError } = await supabase
        .from('post_likes')
        .select('*')
        .eq('post_id', postId)
        .eq('profile_id', req.user.id);

      if (likeError) {
        throw new Error(likeError.message);
      }

      if (!liked || liked.length === 0) {
        return new Response(JSON.stringify({ isLiked: 0 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ isLiked: 1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'DELETE') {
      const authError = await authenticate(req);

      if (authError) {
        return authError;
      }

      const { data: liked, error: likeError } = await supabase
        .from('post_likes')
        .select('*')
        .eq('post_id', postId)
        .eq('profile_id', req.user.id)
        .single();

      if (likeError) {
        throw new Error(likeError.message);
      }

      if (!liked) {
        return new Response('Forbidden: Like doesnt exist', {
          status: 403,
        });
      }

      const { error: deleteError } = await supabase
        .from('post_likes')
        .delete()
        .eq('id', liked.id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      return new Response(
        JSON.stringify({ message: 'Like deleted successfully' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (req.method === 'POST') {
      const authError = await authenticate(req);

      if (authError) {
        return authError;
      }

      const { error: fetchError } = await supabase.from('post_likes').insert({
        post_id: postId,
        profile_id: req.user.id,
      });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      return new Response(JSON.stringify({ message: 'Post Liked' }), {
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
  path: '/api/like/:postId',
};
