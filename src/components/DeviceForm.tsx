import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRevalidator } from 'react-router';

import lastSeenFormatter from '@/helpers/lastSeenFormatter';
import { DeviceFormSchema, type Device, type DeviceFormValues } from '@/types/device';

interface DeviceFormProps {
  defaultValues?: DeviceFormValues,
  onSubmit: SubmitHandler<DeviceFormValues>,
  isSubmitting: boolean,
  mode: 'create' | 'edit' | 'view',
  // present only in edit mode
  status?: Device['status'],
  lastSeenAt?: Device['lastSeenAt'],
}

enum STATUS_COLOR {
  online = 'success',
  offline = 'default',
  degraded = 'warning',
}

const DeviceForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  mode,
  status,
  lastSeenAt,
}: DeviceFormProps) => {
  const { t } = useTranslation();
  const { revalidate } = useRevalidator();
  const [formMode, setFormMode] = useState(mode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeviceFormValues>({
    defaultValues,
    resolver: zodResolver(DeviceFormSchema),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(async (data) => {
        await onSubmit(data);
        await revalidate();
      })}
      noValidate
      sx={{ width: 600, margin: '0 auto', padding: '25px' }}
    >
      <Stack spacing={3}>

        {/* ── readonly: status + lastSeenAt (edit mode only) ── */}
        {(status ?? lastSeenAt) && (
          <Stack direction="row" spacing={2} alignItems="center">
            {status && (
              <Chip
                label={status}
                color={STATUS_COLOR[status]}
                size="small"
              />
            )}
            {lastSeenAt && (
              <Typography variant="overline" gutterBottom sx={{ display: 'inline-block' }}>
                {lastSeenFormatter(lastSeenAt)}
              </Typography>

            )}
          </Stack>
        )}

        {/* ── name ── */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('device.name')}
              required
              disabled={formMode === 'view'}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        {/* ── ipAddress ── */}
        <Controller
          name="ipAddress"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('device.ipAddress')}
              required
              disabled={formMode === 'view'}
              placeholder="192.168.1.1"
              error={!!errors.ipAddress}
              helperText={errors.ipAddress?.message}
            />
          )}
        />

        {/* ── portRange ── */}
        <Stack direction="row" spacing={2}>
          <Controller
            name="portRange.0"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('device.portMin')}
                type="number"
                required
                disabled={formMode === 'view'}
                onChange={(e) => { field.onChange(Number(e.target.value)); }}
                error={!!errors.portRange}
                helperText={errors.portRange?.message ?? errors.portRange?.[0]?.message}
                sx={{ flex: 1 }}
              />
            )}
          />
          <Controller
            name="portRange.1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('device.portMax')}
                type="number"
                required
                disabled={formMode === 'view'}
                onChange={(e) => { field.onChange(Number(e.target.value)); }}
                error={!!errors.portRange}
                helperText={errors.portRange?.message ?? errors.portRange?.[1]?.message}
                sx={{ flex: 1 }}
              />
            )}
          />
        </Stack>

        {/* ── tags ── */}
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              freeSolo
              disabled={formMode === 'view'}
              options={[]}
              value={field.value}
              onChange={(_, value) => { field.onChange(value); }}
              renderTags={(value, getTagProps) => value.map((tag, index) => (
                <Chip
                  label={tag}
                  size="small"
                  {...getTagProps({ index })}
                  key={tag}
                />
              ))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('device.tags')}
                  placeholder={t('device.tagsHint')}
                  error={!!errors.tags}
                  helperText={
                    errors.tags?.message
                    ?? errors.tags?.root?.message
                    ?? t('device.tagsRule')
                  }
                />
              )}
            />
          )}
        />

        {/* ── notes ── */}
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('device.notes')}
              multiline
              disabled={formMode === 'view'}
              minRows={3}
              error={!!errors.notes}
              helperText={errors.notes?.message}
            />
          )}
        />

        {formMode !== 'create' && (
          formMode === 'view' ? (
            <Button variant="outlined" onClick={() => { setFormMode('edit'); }}>
              {t('actions.edit')}
            </Button>
          ) : (
            <Button variant="text" onClick={() => { setFormMode('view'); }}>
              {t('actions.cancel')}
            </Button>
          )
        )}

        {formMode !== 'view' && (
          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('actions.save')}
          </Button>
        )}

      </Stack>
    </Box>
  );
};

export default DeviceForm;
