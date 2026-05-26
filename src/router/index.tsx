import { createBrowserRouter, Outlet, redirect } from 'react-router';

import AppShell from '@/components/AppShell';
import DeviceList from '@/pages/DeviceList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell><Outlet /></AppShell>,
    children: [
      { index: true, loader: () => redirect('/devices') },
      {
        path: 'devices',
        element: <DeviceList />,
      },
    ],
  },
]);

export default router;
