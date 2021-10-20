import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';

import { LoadingWrapper } from '../../components/LoadingWrapper';
import { StatusChip } from '../../components/StatusChip';
import { RaceTable } from '../../components/RaceTable';
import { useFetch } from '../../hooks';
import { RaceWithParticipants, Places } from '../../types';
import backgroundImage from '../../images/background.jpg';
import { useStore, Actions, initialState } from '../../store';

type PlacesType = 'first' | 'second' | 'third';

const StyledContainer = styled(Container)(({ theme }) => ({
  height: 'calc(100% - 200px)',
  padding: `${theme.spacing(4)} 0`
}));

const RaceHeader = styled(Box)({
  width: '100%',
  height: 200,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: `rgba(0, 0, 0, 0.2) url(${backgroundImage})`,
  backgroundBlendMode: 'darken',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
});

const RaceNameContainer = styled(Box)(({ theme }) => ({
  width: 600,
  height: 120,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 80,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  margin: `${theme.spacing(2)} 0`
}));

export const RaceView = () => {
  const { id }: { id: string } = useParams();
  const { data, isLoading, isError } = useFetch({
    urls: {
      raceUrl: `https://my-json-server.typicode.com/hdjfye/bet-api/races/${id}`,
      participantsUrl:
        'https://my-json-server.typicode.com/hdjfye/bet-api/participants'
    }
  });
  const [{ betValue, bets }, dispatch] = useStore();
  const { race, participants } = data as RaceWithParticipants;

  const [isValueError, setIsValueError] = useState(false);
  const [isSumitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      dispatch({ type: Actions.SET_BET_VALUE, payload: initialState.betValue });
      dispatch({
        type: Actions.SET_BET,
        payload: initialState.bets
      });
    };
  }, [dispatch]);

  const handleBetValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsValueError(false);
    const nextValue = event.target.value;
    if (nextValue === '0' || nextValue === '-') {
      return dispatch({ type: Actions.SET_BET_VALUE, payload: '' });
    }
    if (nextValue.startsWith('-') || nextValue.startsWith('0')) {
      return;
    }

    dispatch({ type: Actions.SET_BET_VALUE, payload: nextValue });
  };

  const handleBetChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, place: Places) => {
      setIsValueError(false);
      const nextValue = parseInt(event.target.value);
      const isUsedValue = Object.values(bets).includes(nextValue);
      if (isUsedValue) {
        const keyToClear = (Object.keys(bets) as PlacesType[]).find(
          key => bets[key] === nextValue
        );

        return dispatch({
          type: Actions.SET_BET,
          payload: { ...bets, [place]: nextValue, [keyToClear as Places]: null }
        });
      }

      dispatch({
        type: Actions.SET_BET,
        payload: { ...bets, [place]: nextValue }
      });
    },

    [bets, dispatch]
  );

  const handleClick = () => {
    if (Object.values(bets).some(bet => bet === null) || !parseInt(betValue)) {
      return setIsValueError(true);
    }

    setIsSubmitted(true);
  };

  return (
    <LoadingWrapper isLoading={isLoading} isError={isError}>
      {race && participants && (
        <>
          <RaceHeader>
            <RaceNameContainer>
              <Typography variant="h4">{race.name}</Typography>
              <StatusChip isActive={race.active} />
            </RaceNameContainer>
          </RaceHeader>
          <StyledContainer maxWidth="md">
            <TextField
              id="bet"
              label="Bet amount ($)"
              value={betValue}
              type="number"
              onChange={handleBetValueChange}
              inputProps={{ inputMode: 'numeric', pattern: '^[1-9][0-9]*$' }}
              disabled={!race?.active}
              helperText={
                !race?.active && 'Race is not active. You cannot place a bet.'
              }
            />
            {race && participants && (
              <RaceTable
                race={race}
                participants={participants}
                bets={bets}
                handleChange={handleBetChange}
              />
            )}
            <ButtonContainer>
              <Button
                onClick={handleClick}
                variant="contained"
                size="large"
                disabled={!race?.active}
              >
                Place your bet!
              </Button>
              {!race?.active && (
                <Typography>
                  Sorry, you can't place bet when race is inactive.
                </Typography>
              )}
            </ButtonContainer>
            {isSumitted && !isValueError && (
              <Alert severity="success">Your bet has been set</Alert>
            )}
            {isValueError && (
              <Alert severity="error">
                To set bet place amount and select winner, 2nd place and 3rd
                place
              </Alert>
            )}
          </StyledContainer>
        </>
      )}
    </LoadingWrapper>
  );
};
