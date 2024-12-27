import bcrypt from 'bcryptjs';
import supabase from '../../db/db.js';
import { generateToken } from '../../db/jwt.js';

export default async (req) => {
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

    const token = generateToken(user);

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
