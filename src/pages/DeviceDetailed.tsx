import { FC } from 'react';
import { useLoaderData } from 'react-router';

import { updateDevice } from '@/api/devices';
import DeviceForm from '@/components/DeviceForm';
import deviceLoader from '@/router/loaders/deviceLoader';

const DeviceDetailed: FC = () => {
  const device = useLoaderData<typeof deviceLoader>();

  return (
    <DeviceForm defaultValues={device} mode="view" onSubmit={(data) => updateDevice(device.id, data)} isSubmitting={false} status={device.status} lastSeenAt={device.lastSeenAt} />
  );
};

export default DeviceDetailed;
