import GamepadIcon from '@mui/icons-material/Gamepad';
import RouterIcon from '@mui/icons-material/Router';
import { AppProvider, DashboardLayout } from '@toolpad/core';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from './LanguageSwitcher';

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const navigation = [{ segment: 'devices', title: t('headers.devices'), icon: <RouterIcon /> }];
  return (
    <AppProvider navigation={navigation}>
      <DashboardLayout
        branding={{ title: 'Device Management Console', logo: <GamepadIcon color="primary" /> }}
        slots={{ toolbarActions: LanguageSwitcher }}
      >
        {children}
      </DashboardLayout>
    </AppProvider>
  );
};

export default AppShell;
