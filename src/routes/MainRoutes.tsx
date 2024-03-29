// libs
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// components
import Loadable from '@/components/Loadable';
import Layout from '@/components/layout/Layout';
import AuthGuard from '@/routes/route-guard/AuthGuard';

// renders
const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
const NotFoundPage = Loadable(lazy(() => import('../pages/error/NotFound')));

const BrowserRouter = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default BrowserRouter;
