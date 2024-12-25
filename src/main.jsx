import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { allPostLoader, postLoader } from './loaders/postLoader';
import AllPostsPage from './pages/AllPostsPage';
import CreatePostPage from './pages/CreatePostPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './pages/Layout';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';
import { UserPage } from './pages/UserPage';
import { userLoader } from './loaders/userLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'posts/', element: <AllPostsPage />, loader: allPostLoader },
      { path: 'posts/:id', element: <PostPage />, loader: postLoader },
      { path: 'posts/:id/edit', element: <EditPostPage />, loader: postLoader },
      { path: 'create/', element: <CreatePostPage /> },
      { path: 'users/:id', element: <UserPage />, loader: userLoader },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
