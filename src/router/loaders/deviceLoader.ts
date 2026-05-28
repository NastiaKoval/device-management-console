import { isAxiosError } from 'axios';

import { getDevice } from '@/api/devices';
import i18next from '@/i18n';

import type { LoaderFunctionArgs } from 'react-router';

const deviceLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) throw new Error(i18next.t('errors.missingDeviceId'));

  try {
    return await getDevice(id, request.signal);
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
      throw Object.assign(new Error(i18next.t('errors.deviceNotFound')), { status: 404 });
    }
    throw err;
  }
};

export default deviceLoader;
