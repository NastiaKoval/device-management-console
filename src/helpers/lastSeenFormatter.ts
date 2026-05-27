import i18next from 'i18next';

const lastSeenFormatter = (lastSeen: string) => {
  const rtf = new Intl.RelativeTimeFormat(i18next.language, { style: 'short' });
  const diffSec = Math.round((new Date(lastSeen).getTime() - Date.now()) / 1000);
  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second');
  if (Math.abs(diffSec) < 3600) return rtf.format(Math.round(diffSec / 60), 'minute');
  if (Math.abs(diffSec) < 86400) return rtf.format(Math.round(diffSec / 3600), 'hour');
  return rtf.format(Math.round(diffSec / 86400), 'day');
};

export default lastSeenFormatter;
