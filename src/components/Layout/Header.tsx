import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: 100,
  paddingLeft: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  letterSpacing: 2
}));

export const Header = () => {
  return (
    <StyledBox>
      <Link to="/">
        <StyledTypography variant="h2">betME</StyledTypography>
      </Link>
    </StyledBox>
  );
};
