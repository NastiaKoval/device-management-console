import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { createDevice } from '@/api/devices';
import DeviceForm from '@/components/DeviceForm';
import { useSnackbar } from '@/context/snackbar';
import { type DeviceFormValues } from '@/types/device';

const DeviceNew: FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (values: DeviceFormValues) => {
    setIsSubmitting(true);
    try {
      const newDevice = await createDevice(values);
      showSnackbar(t('alerts.saveSuccess'), 'success');
      await navigate(`/devices/${newDevice.id}`);
    } catch {
      showSnackbar(t('errors.createDevice'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DeviceForm
      mode="create"
      onSubmit={handleSave}
      isSubmitting={isSubmitting}
    />
  );
};

export default DeviceNew;
