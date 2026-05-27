import { createBrowserRouter, Outlet, redirect } from 'react-router';

import AppShell from '@/components/AppShell';
import DeviceDetailed from '@/pages/DeviceDetailed';
import DeviceList from '@/pages/DeviceList';
import DeviceNew from '@/pages/DeviceNew';

import deviceLoader from './loaders/deviceLoader';
import devicesLoader from './loaders/devicesLoader';
// import { lazy, Suspense } from 'react';

// const DeviceDetailed = lazy(() => import('@/pages/DeviceDetailed'));
// const DeviceNew = lazy(() => import('@/pages/DeviceNew'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell><Outlet /></AppShell>,
    // errorElement: <RootErrorBoundary />,
    children: [
      { index: true, loader: () => redirect('/devices') },
      {
        path: 'devices',
        element: <DeviceList />,
        loader: devicesLoader, // calls getDevices(), returns Device[]
        // errorElement: <RouteError />
      },
      {
        path: 'devices/new',
        // element: <Suspense fallback={<CircularProgress />}><DeviceNewPage /></Suspense>,
        element: <DeviceNew />,
      },
      {
        path: 'devices/:id',
        // element: <Suspense fallback={<CircularProgress />}><DeviceDetailPage /></Suspense>,
        element: <DeviceDetailed />,
        loader: deviceLoader, // calls getDevice(id), throws 404 response if not found
        // errorElement: <RouteError />,
      },
    ],
  },
]);

export default router;
