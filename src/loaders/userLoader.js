import { getUserById } from '../api/userService';

export const userLoader = async ({ params }) => {
  const userId = params.id;

  try {
    const user = await getUserById(userId);
    return { user };
  } catch (error) {
    throw new Response(`User not found: ${error}`, { status: 404 });
  }
};
