import config from './config';

const loginURL = config.baseURL + 'login/';
const registerURL = config.baseURL + 'register/';

export async function login(data) {
  const response = await fetch(loginURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
}

export async function register(data) {
  const response = await fetch(registerURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      username: data.username,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  return response.json();
}
