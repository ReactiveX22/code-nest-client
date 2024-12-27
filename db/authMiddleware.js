import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req) => {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    return new Response('Unauthorized', { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    return null;
  } catch (error) {
    return new Response('Unauthorized', { status: 401 });
  }
};
