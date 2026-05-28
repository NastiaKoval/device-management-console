import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, redirect } from 'react-router';

import AppShell from '@/components/AppShell';
import CircularProgress from '@/components/CircularProgress';
import DeviceListSkeleton from '@/components/DeviceListSkeleton';
import RootErrorBoundary from '@/components/RootErrorBoundary';

import deviceLoader from './loaders/deviceLoader';
import devicesLoader from './loaders/devicesLoader';

const DeviceDetailed = lazy(() => import('@/pages/DeviceDetailed'));
const DeviceNew = lazy(() => import('@/pages/DeviceNew'));
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
        hydrateFallbackElement: <DeviceListSkeleton />,
      },
      {
        path: 'devices/new',
        element: <Suspense fallback={<CircularProgress />}><DeviceNew /></Suspense>,
      },
      {
        path: 'devices/:id',
        element: <Suspense fallback={<CircularProgress />}><DeviceDetailed /></Suspense>,
        loader: deviceLoader, // calls getDevice(id), throws 404 response if not found
        hydrateFallbackElement: <CircularProgress />,
      },
    ],
  },
]);

export default router;
