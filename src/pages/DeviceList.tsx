import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router';

import lastSeenFormatter from '@/helpers/lastSeenFormatter';

import i18next from '../i18n';

import type devicesLoader from '@/router/loaders/devicesLoader';
import type { Device } from '@/types/device';

const columns: GridColDef<Device>[] = [
  {
    field: 'name',
    headerName: i18next.t('device.name'),
    resizable: false,
  },
  {
    field: 'status',
    headerName: i18next.t('device.status'),
    renderCell: (params) => {
      const statusToColor = { online: 'success', offline: 'default', degraded: 'warning' } as const;
      return <Chip label={params.row.status} color={statusToColor[params.row.status]} />;
    },
    resizable: false,
  },
  {
    field: 'ipAddress',
    headerName: i18next.t('device.ipAddress'),
    resizable: false,
  },
  {
    field: 'portRange',
    headerName: i18next.t('device.portRange'),
    description: '1 - 65535',
    valueFormatter: (value: Device['portRange']) => value.join(' – '),
    resizable: false,
    sortable: false,
  },
  {
    field: 'lastSeenAt',
    headerName: i18next.t('device.lastSeen'),
    resizable: false,
    valueFormatter: (lastSeen: Device['lastSeenAt']) => lastSeenFormatter(lastSeen),
  },
  {
    field: 'tags',
    headerName: i18next.t('device.tags'),
    valueFormatter: (value: Device['tags']) => value.join(', '),
    resizable: false,
  },
];

const DevicesList = () => {
  const { t } = useTranslation();
  const devices = useLoaderData<typeof devicesLoader>();
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', padding: '0 24px' }}>
      <h1>{t('headers.devices')}</h1>
      <DataGrid
        rows={devices}
        onRowClick={(event) => navigate(`/devices/${encodeURIComponent(event.id)}`)}
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
