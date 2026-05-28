import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, redirect } from 'react-router';

import AppShell from '@/components/AppShell';
import DeviceListSkeleton from '@/components/DeviceListSkeleton';
import DeviceDetailed from '@/pages/DeviceDetailed';
import DeviceNew from '@/pages/DeviceNew';

import deviceLoader from './loaders/deviceLoader';
import devicesLoader from './loaders/devicesLoader';

const DeviceList = lazy(() => import('@/pages/DeviceList'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell><Outlet /></AppShell>,
    children: [
      { index: true, loader: () => redirect('/devices') },
      {
        path: 'devices',
        element: <Suspense fallback={<DeviceListSkeleton />}><DeviceList /></Suspense>,
        loader: devicesLoader, // calls getDevices(), returns Device[]
      },
      {
        path: 'devices/new',
        element: <DeviceNew />,
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
