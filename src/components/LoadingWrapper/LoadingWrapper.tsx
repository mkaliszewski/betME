import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export interface LoadingWrapperProps {
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
}

const StyledBox = styled(Box)({
  width: '100%',
  height: 'calc(100vh - 160px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const LoadingWrapper = ({
  isLoading,
  isError,
  children
}: LoadingWrapperProps) => {
  if (isLoading) {
    return (
      <StyledBox data-testid="spinner-container">
        <CircularProgress color="primary" />
      </StyledBox>
    );
  }

  if (isError) {
    return (
      <StyledBox>
        <Typography>
          Oooops... something went wrong. Try to refresh the page.
        </Typography>
      </StyledBox>
    );
  }

  return <>{children}</>;
};
