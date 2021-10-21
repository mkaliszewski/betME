import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from '@mui/material/styles/styled';

import { LoadingWrapper } from '../../components/LoadingWrapper';
import { StatusChip } from '../../components/StatusChip';
import { RaceTable } from '../../components/RaceTable';
import { BetSummary } from '../../components/BetSummary';
import { Places } from '../../types';
import {
  State,
  fetchRaceWithParticipants,
  setBetValue,
  setBets,
  clearRaceInfo
} from '../../store';
import backgroundImage from '../../images/background.jpg';

const headerHeight = 200;

const StyledContainer = styled(Container)(({ theme }) => ({
  height: `calc(100% - ${headerHeight}px)`,
  padding: `${theme.spacing(4)} 0`
}));

const RaceHeader = styled(Box)({
  width: '100%',
  height: headerHeight,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: `rgba(0, 0, 0, 0.2) url(${backgroundImage})`,
  backgroundBlendMode: 'darken',
  backgroundSize: 'cover',
  backgroundPosition: '50% 20%'
});

const RaceNameContainer = styled(Box)(({ theme }) => ({
  width: 600,
  height: 120,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0, 0.85)',
  color: theme.palette.common.white,
  borderRadius: theme.spacing(1)
}));

export const RaceView = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const { race, activeParticipants, betValue, bets, isLoading, isError } =
    useSelector((state: State) => ({
      race: state.race,
      activeParticipants: state.activeParticipants,
      betValue: state.betValue,
      bets: state.bets,
      isLoading: state.isLoading,
      isError: state.isError
    }));

  const [isValueError, setIsValueError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchRaceWithParticipants(id));

    return () => {
      dispatch(clearRaceInfo());
    };
  }, [dispatch, id]);

  const handleBetValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsValueError(false);
    dispatch(setBetValue(event.target.value));
  };

  const handleBetChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, place: Places) => {
      setIsValueError(false);
      const participantId = parseInt(event.target.value);
      dispatch(setBets(place, participantId));
    },

    [dispatch]
  );

  const handleClick = useCallback(() => {
    if (Object.values(bets).some(bet => bet === null) || !parseInt(betValue)) {
      return setIsValueError(true);
    }
    setIsSubmitted(true);
  }, [betValue, bets]);

  return (
    <LoadingWrapper isLoading={isLoading} isError={isError}>
      {race && activeParticipants && (
        <>
          <RaceHeader>
            <RaceNameContainer>
              <Typography variant="h4">{race.name}</Typography>
              <StatusChip isActive={race.active} />
            </RaceNameContainer>
          </RaceHeader>
          <StyledContainer maxWidth="lg">
            <Grid container>
              <Grid item xs={9}>
                <TextField
                  id="bet"
                  label="Bet amount ($)"
                  value={betValue}
                  type="number"
                  onChange={handleBetValueChange}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '^[1-9][0-9]*$'
                  }}
                  disabled={!race?.active}
                  helperText={
                    !race?.active &&
                    'Race is not active. You cannot place a bet.'
                  }
                />
                <RaceTable
                  race={race}
                  participants={activeParticipants}
                  bets={bets}
                  handleChange={handleBetChange}
                />
              </Grid>
              <Grid item xs={3}>
                <BetSummary
                  betValue={betValue}
                  bets={bets}
                  participants={activeParticipants}
                  isActive={race.active}
                  isValueError={isValueError}
                  isSubmitted={isSubmitted}
                  handleButtonClick={handleClick}
                />
              </Grid>
            </Grid>
          </StyledContainer>
        </>
      )}
    </LoadingWrapper>
  );
};
