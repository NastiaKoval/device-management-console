import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getDevices } from '@/api/devices';
import { Device } from '@/types/device';

const DevicesList: FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getDevices()
      .then((fetchedDevices) => {
        console.log('Fetched devices:', fetchedDevices);
        setDevices(fetchedDevices);
      })
      .catch((err: unknown) => {
        console.error('Failed to fetch devices:', err);
        // alert('Failed to fetch devices. See console for details.');
      });
  }, []);

  return (
    <div>
      <h1>{t('Devices')}</h1>
      {devices.map((device) => (
        <div key={device.id} style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px' }}>
          <div>{device.name}</div>
          <div>{device.status}</div>
          <div>{device.ipAddress}</div>
          <div>{device.portRange.join(' - ')}</div>
          <div>{device.lastSeenAt}</div>
          <div>{device.tags.join(', ')}</div>
          <div>{device.notes}</div>
        </div>
      ))}
    </div>
  );
};

export default DevicesList;
