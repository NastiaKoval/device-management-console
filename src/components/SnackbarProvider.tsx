// cSpell:ignore clickaway
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { SnackbarContext, type SnackbarSeverity } from '@/context/snackbar';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

const INITIAL_STATE: SnackbarState = { open: false, message: '', severity: 'info' };
const AUTO_HIDE_MS = 4000;

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [state, setState] = useState<SnackbarState>(INITIAL_STATE);

  const showSnackbar = useCallback((message: string, severity: SnackbarSeverity = 'info') => {
    setState({ open: true, message, severity });
  }, []);

  const handleClose = useCallback((_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const contextValue = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}

      <Snackbar
        open={state.open}
        autoHideDuration={AUTO_HIDE_MS}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
