import fs from 'fs';
import path from 'path';

export default async (req, context) => {
  try {
    // Path to your db.json file
    const filePath = path.resolve('./api/db.json'); // Ensure this path is correct

    // Read the content of db.json file
    const data = fs.readFileSync(filePath, 'utf-8');
    const db = JSON.parse(data); // Parse the JSON data

    // Get posts from db.json
    const posts = db.posts || []; // Default to empty array if posts is not found

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading db.json:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/posts',
};
