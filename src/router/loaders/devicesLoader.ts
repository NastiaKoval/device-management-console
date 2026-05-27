import { isAxiosError } from 'axios';

import { getDevices } from '@/api/devices';

const devicesLoader = async ({ request }: { request: Request }) => {
  try {
    return await getDevices(request.signal);
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
      throw new Error('Not found');
    }
    throw err;
  }
};

export default devicesLoader;
