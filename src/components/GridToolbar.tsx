import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { STATUS_TO_TOGGLE, STATUSES } from '@/helpers/constants';
import useDebounce from '@/hooks/useDebounce';

import type { Device } from '@/types/device';

export type StatusFilter = Device['status'] | '';

export interface GridToolbarProps {
  /** Initial value from the URL — read once on mount. */
  initialSearch: string;

  onParamChange: (param: 'search' | 'status', value: string) => void;
  statusFilter: StatusFilter;
}

const GridToolbar = ({
  initialSearch,
  onParamChange,
  statusFilter,
}: GridToolbarProps) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(initialSearch);
  const debouncedSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    onParamChange('search', debouncedSearch);
  }, [debouncedSearch, onParamChange]);

  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" gap={2}>
      <TextField
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value); }}
        placeholder={t('toolbar.searchPlaceholder')}
        size="small"
        sx={{ minWidth: 260 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: inputValue ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => { setInputValue(''); }}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />

      <ToggleButtonGroup
        value={statusFilter || null}
        exclusive
        onChange={(_, value: Device['status'] | null) => {
          onParamChange('status', value ?? '');
        }}
        size="small"
      >
        {Array.from(STATUSES).map((s) => (
          <ToggleButton key={s} value={s} color={STATUS_TO_TOGGLE[s]}>
            {t(`device.statuses.${s}`)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

    </Stack>
  );
};

export default memo(GridToolbar);
