import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../../db/db.js';

const JWT_SECRET = process.env.JWT_SECRET;

export default async (req, context) => {
  try {
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return new Response('Email and password are required', { status: 400 });
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (error || users.length === 0) {
      return new Response('Invalid email or password', { status: 401 });
    }
    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response('Invalid email or password', { status: 401 });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/login',
};
