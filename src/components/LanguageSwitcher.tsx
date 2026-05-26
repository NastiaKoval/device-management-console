import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';

import i18n from '@/i18n';

const LanguageSwitcher: FC = () => {
  const handleLanguageChange = (lang: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18n.changeLanguage(lang);
  };

  return (
    <ToggleButtonGroup>
      <ToggleButton value="en" onClick={() => { handleLanguageChange('en'); }}>
        EN
      </ToggleButton>
      <ToggleButton value="uk" onClick={() => { handleLanguageChange('uk'); }}>
        UK
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitcher;
