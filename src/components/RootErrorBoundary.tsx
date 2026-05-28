import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

const RootErrorBoundary = () => {
  const { t } = useTranslation();
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  const message = isRouteErrorResponse(error) && error.status === 404 ? t('errors.notFound') : (error.message || t('errors.unexpectedError'));

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
      <Button variant="contained" onClick={async () => navigate('/')}>
        {t('actions.goHome')}
      </Button>
    </div>
  );
};

export default RootErrorBoundary;
