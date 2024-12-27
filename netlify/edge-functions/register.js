import bcrypt from 'bcryptjs';
import supabase from '../../db/db.js';
import { generateToken } from '../../db/jwt.js';

const SALT_ROUNDS = 10;

export default async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return new Response('Email, password, and username are required', {
        status: 400,
      });
    }

    const { data: existingUsersByEmail, error: fetchErrorEmail } =
      await supabase.from('users').select('*').eq('email', email).limit(1);

    if (fetchErrorEmail || !existingUsersByEmail) {
      throw new Error('Error checking existing emails');
    }

    if (existingUsersByEmail.length > 0) {
      return new Response('Email already registered', { status: 409 });
    }

    const { data: existingUsersByUsername, error: fetchErrorUsername } =
      await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .limit(1);

    if (fetchErrorUsername || !existingUsersByUsername) {
      throw new Error('Error checking existing usernames');
    }

    if (existingUsersByUsername.length > 0) {
      return new Response('Username already taken', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword, username }])
      .select('id, email, username');

    if (error || !data || !data[0]) {
      throw new Error('Error creating user');
    }

    const token = generateToken(data[0]);

    return new Response(
      JSON.stringify({
        message: 'User registered successfully',
        token,
        user: {
          id: data[0].id,
          email: data[0].email,
          username: data[0].username,
        },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const config = {
  path: '/api/register',
};
