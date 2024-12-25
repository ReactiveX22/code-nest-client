import DB from '../../db/db';

export default async (req, context) => {
  try {
    const dbData = await DB.get();

    if (req.method === 'GET') {
      const posts = dbData.posts || [];
      return new Response(JSON.stringify(posts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      const { id, title, content, author } = await req.json();

      if (!title || !content) {
        return new Response('Bad Request: Missing title or content', {
          status: 400,
        });
      }

      const newPost = {
        id,
        title,
        content,
        author,
      };

      dbData.posts.push(newPost);
      await DB.save(dbData);

      return new Response(JSON.stringify(newPost), {
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
