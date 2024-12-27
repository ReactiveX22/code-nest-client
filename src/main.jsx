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
import { ThemeProvider } from './context/ThemeProvider';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedLayout } from './pages/ProtectedLayout';
import { RegisterPage } from './pages/RegisterPage';
import { LandingPage } from './pages/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
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
      { path: 'users/:id', element: <UserPage />, loader: userLoader },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },

      // Protected routes
      {
        path: 'create',
        element: (
          <ProtectedLayout>
            <CreatePostPage />
          </ProtectedLayout>
        ),
      },
      {
        path: 'posts/:id/edit',
        element: (
          <ProtectedLayout>
            <EditPostPage />
          </ProtectedLayout>
        ),
        loader: postLoader,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
