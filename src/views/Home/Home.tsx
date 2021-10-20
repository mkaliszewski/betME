import Box from '@mui/material/Box';
import styled from 'styled-components';
import { theme } from '../../styles';

const Wrapper = styled(Box)`
  background-color: ${theme.palette.primary.main};
`;

export const Home = () => {
  return <Wrapper>This is homepage!</Wrapper>;
};
