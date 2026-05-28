import { Button, Typography } from '@mui/material';
import { Component, type ReactNode } from 'react';

import i18next from '@/i18n';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
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
          <Typography variant="h5">{i18next.t('errors.unexpectedError')}</Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            {i18next.t('actions.reload')}
          </Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
