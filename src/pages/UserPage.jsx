import { useLoaderData } from 'react-router-dom';

export const UserPage = () => {
  const { user } = useLoaderData();

  return <div>{user.name}</div>;
};
