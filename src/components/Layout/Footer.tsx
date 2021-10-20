import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 300
}));

export const Footer = () => {
  return (
    <StyledBox>
      <StyledTypography variant="h6">{`betME@${new Date().getFullYear()}`}</StyledTypography>
    </StyledBox>
  );
};
