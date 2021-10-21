import { Component, ReactNode } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type State = {
  hasError: boolean;
};

type Props = {
  children: ReactNode;
};

export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  constructor(props: Props) {
    super(props);
    this.timeout = null;
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error: Error): void {
    const { hasError } = this.state;
    if (hasError) {
      this.timer();
    }
    console.error(error);
  }

  componentWillUnmount(): void {
    this.clearTimer();
  }

  timeout: ReturnType<typeof setTimeout> | null;

  clearTimer = (): void => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  };

  navigateHome = (): void => window.location.replace('/');

  timer = (): ReturnType<typeof setTimeout> => {
    this.clearTimer();

    return (this.timeout = setTimeout(() => {
      this.navigateHome();
    }, 6000));
  };

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    const handleReturn = (): void => {
      this.clearTimer();
      this.navigateHome();
    };

    return hasError ? (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h2" align="center">
          Oooops... something went not as expected. You'll be redirected to
          homepage shortly.
        </Typography>
        <Button onClick={handleReturn}>Go to homepage</Button>
      </Box>
    ) : (
      children
    );
  }
}
