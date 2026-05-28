import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, redirect } from 'react-router';

import AppShell from '@/components/AppShell';
import DeviceListSkeleton from '@/components/DeviceListSkeleton';
import RootErrorBoundary from '@/components/RootErrorBoundary';
import DeviceDetailed from '@/pages/DeviceDetailed';
import DeviceNew from '@/pages/DeviceNew';

import deviceLoader from './loaders/deviceLoader';
import devicesLoader from './loaders/devicesLoader';
// import { lazy, Suspense } from 'react';

// const DeviceDetailed = lazy(() => import('@/pages/DeviceDetailed'));
// const DeviceNew = lazy(() => import('@/pages/DeviceNew'));
const DeviceList = lazy(() => import('@/pages/DeviceList'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell><Outlet /></AppShell>,
    errorElement: <RootErrorBoundary />,
    children: [
      { index: true, loader: () => redirect('/devices') },
      {
        path: 'devices',
        element: <Suspense fallback={<DeviceListSkeleton />}><DeviceList /></Suspense>,
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
