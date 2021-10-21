import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { yellow, grey, brown } from '@mui/material/colors';

import { styled } from '@mui/material/styles';

import type { Bets, Participant } from '../../types';

interface BetSummaryProps {
  betValue: string;
  bets: Bets;
  participants: Participant[];
  isActive: boolean;
  isValueError: boolean;
  isSubmitted: boolean;
  handleButtonClick: () => void;
}

type BetsNames = (string | undefined)[];

const colors = [yellow[300], grey[300], brown[300]];

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(7),
  marginLeft: theme.spacing(2),
  boxShadow: `0px 0px 18px 0px ${grey[300]}`,
  borderRadius: theme.spacing(1)
}));

const Header = styled(Grid)(({ theme }) => ({
  width: '100%',
  height: 'fit-content',
  padding: theme.spacing(2),
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white
}));

const BetNameWrapper = styled(Grid)({
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const CenteredGrid = styled(Grid)({
  height: 90,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const BetSummary = ({
  betValue,
  bets,
  participants,
  isActive,
  isValueError,
  isSubmitted,
  handleButtonClick
}: BetSummaryProps) => {
  const [betNames, setBetNames] = useState<BetsNames>([]);

  useEffect(() => {
    const betParticipants: BetsNames = [];
    const betsIds = Object.values(bets);
    betsIds.forEach(bet => {
      const foundParticipant = participants.find(
        participant => participant.id === bet
      );
      betParticipants.push(foundParticipant?.body);
    });

    setBetNames(betParticipants);
  }, [bets, participants]);
  return (
    <StyledGrid container>
      <Header item xs={12} justifyContent="center">
        <Typography variant="h4">Your bet</Typography>
      </Header>
      {betNames.map((name, index) => (
        <BetNameWrapper
          item
          xs={12}
          sx={{
            backgroundColor: colors[index]
          }}
        >
          <Typography>{name ?? 'None'}</Typography>
        </BetNameWrapper>
      ))}

      <CenteredGrid item xs={4} sx={{ flexDirection: 'column' }}>
        <Typography align="center">Your bet:</Typography>
        <Typography variant="h5" align="center" sx={{ wordBreak: 'break-all' }}>
          ${betValue}
        </Typography>
      </CenteredGrid>
      <CenteredGrid item xs={8}>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          size="large"
          disabled={!isActive}
        >
          Place your bet!
        </Button>
      </CenteredGrid>
      <Grid xs={12}>
        {isSubmitted && !isValueError && (
          <Alert severity="success">Your bet has been set</Alert>
        )}
        {isValueError && (
          <Alert severity="error">
            To set bet place amount and select winner, 2nd place and 3rd place
          </Alert>
        )}
        {!isActive && (
          <Alert severity="error">
            Sorry, you can't place bet when race is inactive.
          </Alert>
        )}
      </Grid>
    </StyledGrid>
  );
};
