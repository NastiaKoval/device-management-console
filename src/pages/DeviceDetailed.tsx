import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router';

import { deleteDevice, updateDevice } from '@/api/devices';
import DeleteAction from '@/components/ActionWithConfirmation';
import DeviceForm from '@/components/DeviceForm';
import { useSnackbar } from '@/context/snackbar';
import deviceLoader from '@/router/loaders/deviceLoader';
import { type DeviceFormValues } from '@/types/device';

const DeviceDetailed: FC = () => {
  const device = useLoaderData<typeof deviceLoader>();
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleSave = async (values: DeviceFormValues) => {
    setIsSubmitting(true);
    try {
      await updateDevice(device.id, values);
      showSnackbar(t('alerts.saveSuccess'), 'success');
    } catch {
      showSnackbar(t('errors.updateDevice'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteDevice(device.id);
      showSnackbar(t('alerts.deleteSuccess'), 'success');
      await navigate('/devices');
    } catch {
      showSnackbar(t('errors.deleteDevice'), 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Box sx={{ width: 600, margin: '0 auto', padding: '25px' }}>
      <DeviceForm
        defaultValues={device}
        mode="view"
        onSubmit={handleSave}
        isSubmitting={isSubmitting}
        status={device.status}
        lastSeenAt={device.lastSeenAt}
      />
      <DeleteAction
        buttonText={t('actions.delete')}
        onConfirm={handleDelete}
        confirmationText={t('actions.confirmDelete')}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default DeviceDetailed;
