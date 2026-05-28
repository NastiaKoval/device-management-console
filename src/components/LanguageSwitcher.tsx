import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC, useState } from 'react';

import i18n from '@/i18n';

const LanguageSwitcher: FC = () => {
  const [lang, setLang] = useState(i18n.language);

  const handleChange = (_: React.MouseEvent, newLang: string | null) => {
    if (!newLang) return;
    setLang(newLang);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18n.changeLanguage(newLang);
  };

  return (
    <ToggleButtonGroup exclusive value={lang} onChange={handleChange} size="small">
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="uk">UK</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitcher;
