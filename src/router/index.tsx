import { createBrowserRouter, Outlet, redirect } from 'react-router';

import AppShell from '@/components/AppShell';
import DeviceDetailed from '@/pages/DeviceDetailed';
import DeviceList from '@/pages/DeviceList';

import deviceLoader from './loaders/deviceLoader';
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
      {
        path: 'devices/:id',
        element: <DeviceDetailed />,
        loader: deviceLoader, // calls getDevice(id), throws 404 response if not found
      },
    ],
  },
]);

export default router;
