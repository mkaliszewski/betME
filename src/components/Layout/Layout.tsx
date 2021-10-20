import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { Header } from './Header';

const FullHeightWrapper = styled(Box)({
  minHeight: 'calc(100vh - 100px);',
  margin: '100px 0 40px 0'
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <FullHeightWrapper>
      <Header />
      {children}
    </FullHeightWrapper>
  );
};
