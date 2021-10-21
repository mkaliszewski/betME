import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from './actionTypes';
import { Status, Race, Participant, Places } from '../types';

export const setStatus = (status: Status) => ({
  type: ActionTypes.SET_STATUS,
  payload: status
});

export const setRaces = (races: Race[]) => ({
  type: ActionTypes.SET_RACES,
  payload: races
});

export const setRace = (race: Race | undefined) => ({
  type: ActionTypes.SET_RACE,
  payload: race
});

export const setActiveParticipants = (participants: Participant[]) => ({
  type: ActionTypes.SET_ACTIVE_PARTICIPANTS,
  payload: participants
});

export const setBetValue = (betValue: string) => ({
  type: ActionTypes.SET_BET_VALUE,
  payload: betValue
});

export const setBets = (place: Places, participantId: number) => ({
  type: ActionTypes.SET_BETS,
  payload: { place, participantId }
});

export const fetchStart = () => ({
  type: ActionTypes.FETCH_START
});

export const fetchSuccess = () => ({
  type: ActionTypes.FETCH_SUCCESS
});

export const fetchFailure = () => ({
  type: ActionTypes.FETCH_FAILURE
});

export const clearRaceInfo = () => ({
  type: ActionTypes.CLEAR_RACE_INFO
});

export const fetchRaces = (): ThunkAction<
  Promise<void>,
  Record<string, unknown>,
  Record<string, unknown>,
  AnyAction
> => {
  return async (
    dispatch: ThunkDispatch<
      Record<string, unknown>,
      Record<string, unknown>,
      AnyAction
    >
  ): Promise<void> => {
    dispatch(fetchStart());

    try {
      const response = await fetch(
        'https://my-json-server.typicode.com/hdjfye/bet-api/races'
      );
      if (response) {
        const responseData = (await response.json()) as Race[];
        dispatch(setRaces(responseData));
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchFailure());
      }
    } catch (e) {
      dispatch(fetchFailure());
    }
  };
};

export const fetchRaceWithParticipants = (
  raceId: string
): ThunkAction<
  Promise<void>,
  Record<string, unknown>,
  Record<string, unknown>,
  AnyAction
> => {
  return async (
    dispatch: ThunkDispatch<
      Record<string, unknown>,
      Record<string, unknown>,
      AnyAction
    >
  ): Promise<void> => {
    dispatch(fetchStart());

    try {
      const [racesResponse, participantsResponse] = await Promise.all([
        fetch(
          `https://my-json-server.typicode.com/hdjfye/bet-api/races/${raceId}`
        ),
        fetch('https://my-json-server.typicode.com/hdjfye/bet-api/participants')
      ]);
      if (racesResponse && participantsResponse) {
        const race = (await racesResponse.json()) as Race;
        const participants =
          (await participantsResponse.json()) as Participant[];

        const activeParticipants: Participant[] = [];
        race.participants.forEach(participant => {
          participants.forEach(racer => {
            if (racer.id === participant) {
              activeParticipants.push(racer);
            }
          });
        });

        dispatch(setRace(race));
        dispatch(setActiveParticipants(activeParticipants));
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchFailure());
      }
    } catch (e) {
      dispatch(fetchFailure());
    }
  };
};
