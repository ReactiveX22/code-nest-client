import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { postLoader } from './loaders/postLoader';
import { userLoader } from './loaders/userLoader';
import AllPostsPage from './pages/AllPostsPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './pages/Layout';
import PostPage from './pages/PostPage';
import { UserPage } from './pages/UserPage';
import { PostsProvider } from './context/PostsProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'posts/',
        element: (
          <PostsProvider>
            <AllPostsPage />
          </PostsProvider>
        ),
      },
      {
        path: 'posts/:id',
        element: <PostPage />,
        loader: postLoader,
      },
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
