import { createBrowserRouter, Outlet, redirect } from 'react-router';

import AppShell from '@/components/AppShell';
import DeviceList from '@/pages/DeviceList';

import devicesLoader from './loaders/devicesLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell><Outlet /></AppShell>,
    children: [
      { index: true, loader: () => redirect('/devices') },
      {
        path: 'devices',
        element: <DeviceList />,
        loader: devicesLoader, // calls getDevices(), returns Device[]
      },
    ],
  },
]);

export default router;
