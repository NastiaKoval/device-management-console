import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ActionWithConfirmation: FC<{
  buttonText: string; onConfirm: () => Promise<void>; confirmationText: string; isLoading?: boolean
}> = ({
  buttonText, onConfirm, confirmationText, isLoading = false,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="error" fullWidth loading={isLoading} onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {confirmationText}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {t('actions.cancel')}
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            {t('actions.confirm')}
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default ActionWithConfirmation;
