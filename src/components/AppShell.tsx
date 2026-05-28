import GamepadIcon from '@mui/icons-material/Gamepad';
import RouterIcon from '@mui/icons-material/Router';
import { AppProvider, DashboardLayout } from '@toolpad/core';

import i18next from '../i18n';

import LanguageSwitcher from './LanguageSwitcher';

const navigation = [{ segment: 'devices', title: i18next.t('Devices'), icon: <RouterIcon /> }];

const AppShell = ({ children }: { children: React.ReactNode }) => (
  <AppProvider navigation={navigation}>
    <DashboardLayout
      branding={{ title: 'Device Management Console', logo: <GamepadIcon color="primary" /> }}
      slots={{ toolbarActions: LanguageSwitcher }}
    >
      {children}
    </DashboardLayout>
  </AppProvider>
);

export default AppShell;
