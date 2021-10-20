import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)({
  width: '100%',
  height: 'calc(100vh - 160px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

interface LoadingWrapperProps {
  isLoading: boolean;
  children: ReactNode;
}

export const LoadingWrapper = ({
  isLoading,
  children
}: LoadingWrapperProps) => {
  return isLoading ? (
    <StyledBox>
      <CircularProgress color="primary" />
    </StyledBox>
  ) : (
    <>{children}</>
  );
};
