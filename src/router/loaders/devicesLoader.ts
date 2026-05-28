import { isAxiosError } from 'axios';

import { getDevices } from '@/api/devices';

const devicesLoader = () => ({
  devices: getDevices().catch((err: unknown) => {
    if (isAxiosError(err) && err.response?.status === 404) {
      throw new Error('Not found');
    }
    throw err;
  }),
});

export default devicesLoader;
