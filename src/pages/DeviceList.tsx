import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import Chip from '@mui/material/Chip';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router';

import GridToolbar, { type StatusFilter } from '@/components/GridToolbar';
import { STATUS_TO_CHIP, STATUSES } from '@/helpers/constants';
import lastSeenFormatter from '@/helpers/lastSeenFormatter';
import i18next from '@/i18n';

import type devicesLoader from '@/router/loaders/devicesLoader';
import type { Device } from '@/types/device';

// columns (defined outside component — no re-creation on re-render)

const columns: GridColDef<Device>[] = [
  {
    field: 'name',
    headerName: i18next.t('device.name'),
    resizable: false,
    flex: 1,
  },
  {
    field: 'status',
    headerName: i18next.t('device.status'),
    renderCell:
      (params) => <Chip label={params.row.status} color={STATUS_TO_CHIP[params.row.status]} />,
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
    sortable: false,
  },
];

// helpers

const toStatusFilter = (v: string): StatusFilter => {
  if (STATUSES.has(v as Device['status'])) return v as Device['status'];
  return '';
};

const DeviceList = () => {
  const { t } = useTranslation();
  const devices = useLoaderData<typeof devicesLoader>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const statusFilter = toStatusFilter(searchParams.get('status') ?? '');

  // URL writers

  const handleParamChange = useCallback((param: 'search' | 'status', value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(param, value);
        else next.delete(param);
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  // client-side filtering

  const filteredDevices = useMemo(() => devices.filter((d) => {
    if (statusFilter && d.status !== statusFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      d.name.toLowerCase().includes(q)
      || d.ipAddress.includes(q)
      || d.tags.some((tag) => tag.includes(q))
    );
  }), [devices, search, statusFilter]);

  return (
    <Box sx={{ width: '100%', padding: '0 24px' }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, mb: 1, flexWrap: 'wrap', gap: 2,
      }}
      >
        <h1>{t('headers.devices')}</h1>
        <GridToolbar
          initialSearch={search}
          onParamChange={handleParamChange}
          statusFilter={statusFilter}
        />
      </Box>

      <DataGrid
        rows={filteredDevices}
        onRowClick={async (event) => { await navigate(`/devices/${encodeURIComponent(event.id)}`); }}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableColumnFilter
        pageSizeOptions={[10]}
        disableColumnSelector
        autosizeOnMount
        autosizeOptions={{ includeHeaders: true, includeOutliers: true, expand: true }}
      />

      <Box sx={{ position: 'fixed', bottom: 56, right: 48 }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={async () => { await navigate('/devices/new'); }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default DeviceList;
