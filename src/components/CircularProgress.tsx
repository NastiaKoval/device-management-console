import { CircularProgress as MuiCircularProgress } from '@mui/material';

const CircularProgress = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  }}
  >
    <MuiCircularProgress />
  </div>
);

export default CircularProgress;
