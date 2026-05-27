import { isAxiosError } from 'axios';

import { getDevice } from '@/api/devices';

const deviceLoader = async ({ params, request }: { params: { id: string }; request: Request }) => {
  const { signal } = request; // automatically cancelled on navigation away
  try {
    return await getDevice(params.id, signal);
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
      throw new Error('Not found');
    }
    throw err;
  }
};

export default deviceLoader;
