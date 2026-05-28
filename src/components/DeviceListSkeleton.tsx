import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ROW_COUNT = 10;
const GRID_COLS = '3fr 1.5fr 2fr 2fr 2fr 2fr';

// Approximate DataGrid dimensions (standard density)
const HEADER_H = 56;
const ROW_H = 52;
const FOOTER_H = 52;

const HeaderCell = () => <Skeleton variant="text" height={20} width="55%" />;

const RowCells = () => (
  <>
    <Skeleton variant="text" height={20} width="70%" />
    {/* status chip */}
    <Skeleton variant="rounded" height={24} width={72} />
    <Skeleton variant="text" height={20} width="80%" />
    <Skeleton variant="text" height={20} width="65%" />
    <Skeleton variant="text" height={20} width="75%" />
    <Skeleton variant="text" height={20} width="50%" />
  </>
);

const cellBase = {
  display: 'grid',
  gridTemplateColumns: GRID_COLS,
  alignItems: 'center',
  columnGap: 2,
  px: 2,
  borderBottom: '1px solid',
  borderColor: 'divider',
};

const DeviceListSkeleton = () => (
  <Box sx={{ width: '100%', padding: '0 24px' }}>
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, mb: 1, flexWrap: 'wrap', gap: 2,
    }}
    >
      <Skeleton variant="text" width={160} height={48} sx={{ margin: '21px 0' }} />
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" gap={2}>
        <Skeleton variant="rounded" width={260} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="rounded" width={275} height={40} />
      </Stack>
    </Box>
    <Box
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {/* header */}
      <Box sx={{ ...cellBase, height: HEADER_H, borderBottomWidth: '2px' }}>
        {Array.from({ length: 6 }, (_, i) => <HeaderCell key={i} />)}
      </Box>

      {/* rows */}
      {Array.from({ length: ROW_COUNT }, (_, i) => (
        <Box key={i} sx={{ ...cellBase, height: ROW_H }}>
          <RowCells />
        </Box>
      ))}

      {/* pagination footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
          px: 2,
          height: FOOTER_H,
        }}
      >
        <Skeleton variant="text" width={180} height={20} />
        <Skeleton variant="rounded" width={64} height={30} />
      </Box>
    </Box>
  </Box>
);

export default DeviceListSkeleton;
