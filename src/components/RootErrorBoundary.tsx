import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const RootErrorBoundary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      <Typography variant="h5">{t('errors.unexpectedError')}</Typography>
      <Button variant="contained" onClick={async () => navigate('/')}>
        {t('actions.goHome')}
      </Button>
    </div>
  );
};

export default RootErrorBoundary;
