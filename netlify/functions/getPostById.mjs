import supabase from '../../db/db';

export default async (req, context) => {
  try {
    if (req.method !== 'GET') {
      return new Response('Method Not Allowed', { status: 405 });
    }

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
  } catch (error) {
    console.error('Error fetching post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/posts/:postId',
};
