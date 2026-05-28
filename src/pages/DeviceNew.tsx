import { Box } from '@mui/material';
import {
  FC, useEffect, useRef, useState,
} from 'react';
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
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => { abortRef.current?.abort(); }, []);

  const handleSave = async (values: DeviceFormValues) => {
    abortRef.current = new AbortController();
    setIsSubmitting(true);
    try {
      const newDevice = await createDevice(values, abortRef.current.signal);
      showSnackbar(t('alerts.saveSuccess'), 'success');
      await navigate(`/devices/${newDevice.id}`);
    } catch {
      showSnackbar(t('errors.createDevice'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: 600, margin: '0 auto', padding: '25px' }}>
      <DeviceForm
        mode="create"
        onSubmit={handleSave}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
};

export default DeviceNew;
