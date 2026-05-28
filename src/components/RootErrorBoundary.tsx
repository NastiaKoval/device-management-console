import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

type RouteError = Error & { status?: number };

const RootErrorBoundary = () => {
  const { t } = useTranslation();
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  const is404 = (isRouteErrorResponse(error) && error.status === 404) || error.status === 404;
  const message = is404 ? t('errors.deviceNotFound') : (error.message || t('errors.unexpectedError'));

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: 16,
    }}
    >
      <Typography variant="h5">{message}</Typography>
      {is404 ? (
        <Button variant="contained" onClick={async () => navigate('/devices')}>
          {t('actions.goToDevices')}
        </Button>
      ) : (
        <Button variant="contained" onClick={async () => navigate('/')}>
          {t('actions.goHome')}
        </Button>
      )}
    </div>
  );
};

export default RootErrorBoundary;
