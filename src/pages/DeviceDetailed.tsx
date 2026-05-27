import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router';

import { updateDevice } from '@/api/devices';
import DeviceForm from '@/components/DeviceForm';
import { useSnackbar } from '@/context/snackbar';
import deviceLoader from '@/router/loaders/deviceLoader';
import { type DeviceFormValues } from '@/types/device';

const DeviceDetailed: FC = () => {
  const device = useLoaderData<typeof deviceLoader>();
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (values: DeviceFormValues) => {
    setIsSubmitting(true);
    try {
      await updateDevice(device.id, values);
      showSnackbar(t('alerts.saveSuccess'), 'success');
      await navigate('/devices');
    } catch {
      showSnackbar(t('errors.updateDevice'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DeviceForm
      defaultValues={device}
      mode="view"
      onSubmit={handleSave}
      isSubmitting={isSubmitting}
      status={device.status}
      lastSeenAt={device.lastSeenAt}
    />
  );
};

export default DeviceDetailed;
