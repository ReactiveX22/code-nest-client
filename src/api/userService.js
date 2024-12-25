import config from './config.json';

const userURL = config.baseURL + 'users/';

export async function getUserById(userId) {
  const response = await fetch(userURL + userId);

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const userData = await response.json();

  return userData;
}
