import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';

import i18next from '../i18n';

import type devicesLoader from '@/router/loaders/devicesLoader';
import type { Device } from '@/types/device';

const columns: GridColDef<Device>[] = [
  {
    field: 'name',
    headerName: i18next.t('name'),
    resizable: false,
  },
  {
    field: 'status',
    headerName: i18next.t('status'),
    renderCell: (params) => {
      const statusToColor = { online: 'success', offline: 'default', degraded: 'warning' } as const;
      return <Chip label={params.row.status} color={statusToColor[params.row.status]} />;
    },
    resizable: false,
  },
  {
    field: 'ipAddress',
    headerName: 'IP',
    resizable: false,
  },
  {
    field: 'portRange',
    headerName: i18next.t('port range'),
    description: '1 - 65535',
    valueFormatter: (value: Device['portRange']) => value.join(' – '),
    resizable: false,
    sortable: false,
  },
  {
    field: 'lastSeenAt',
    headerName: i18next.t('last seen'),
    resizable: false,
    valueFormatter: (value: Device['lastSeenAt']) => {
      const rtf = new Intl.RelativeTimeFormat(i18next.language, { style: 'short' });
      const diffSec = Math.round((new Date(value).getTime() - Date.now()) / 1000);
      if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second');
      if (Math.abs(diffSec) < 3600) return rtf.format(Math.round(diffSec / 60), 'minute');
      if (Math.abs(diffSec) < 86400) return rtf.format(Math.round(diffSec / 3600), 'hour');
      return rtf.format(Math.round(diffSec / 86400), 'day');
    },
  },
  {
    field: 'tags',
    headerName: i18next.t('tags'),
    valueFormatter: (value: Device['tags']) => value.join(', '),
    resizable: false,
  },
];

const DevicesList = () => {
  const { t } = useTranslation();
  const devices = useLoaderData<typeof devicesLoader>();

  return (
    <Box sx={{ width: '100%', padding: '0 24px' }}>
      <h1>{t('Devices')}</h1>
      <DataGrid
        rows={devices}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableColumnFilter
        pageSizeOptions={[10]}
        disableColumnSelector
        autosizeOnMount
        autosizeOptions={{ includeHeaders: true, includeOutliers: true, expand: true }}
      />
    </Box>
  );
};

export default DevicesList;
