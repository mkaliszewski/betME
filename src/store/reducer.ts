import { persistReducer } from 'redux-persist';
import {} from 'redux';
import storage from 'redux-persist/lib/storage';
import { ActionTypes } from './actionTypes';
import { Status, Race, Participant, Bets, Places } from '../types';

interface ActionA {
  type: ActionTypes.SET_STATUS;
  payload: Status;
}
interface ActionB {
  type: ActionTypes.SET_RACES;
  payload: Race[];
}
interface ActionC {
  type: ActionTypes.SET_RACE;
  payload: Race;
}
interface ActionD {
  type: ActionTypes.SET_ACTIVE_PARTICIPANTS;
  payload: Participant[];
}
interface ActionE {
  type: ActionTypes.SET_BET_VALUE;
  payload: string;
}
interface ActionF {
  type: ActionTypes.SET_BETS;
  payload: {
    place: Places;
    participantId: number;
  };
}
interface ActionG {
  type: ActionTypes.CLEAR_RACE_INFO;
}
interface ActionH {
  type: ActionTypes.FETCH_START;
}
interface ActionI {
  type: ActionTypes.FETCH_SUCCESS;
}
interface ActionJ {
  type: ActionTypes.FETCH_FAILURE;
}

type Action =
  | ActionA
  | ActionB
  | ActionC
  | ActionD
  | ActionE
  | ActionF
  | ActionG
  | ActionH
  | ActionI
  | ActionJ;

export interface State {
  status: Status;
  races: Race[];
  race: Race | undefined;
  activeParticipants: Participant[];
  filtredRaces: Race[];
  betValue: string;
  bets: Bets;
  isLoading: boolean;
  isError: boolean;
}

type PlacesType = 'first' | 'second' | 'third';

export const INITIAL_STATE = {
  status: Status.Any,
  races: [],
  race: undefined,
  activeParticipants: [],
  filtredRaces: [],
  betValue: '0',
  bets: { [Places.First]: null, [Places.Second]: null, [Places.Third]: null },
  isLoading: true,
  isError: false
};

const reducer = (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_STATUS:
      return {
        ...state,
        status: action.payload,
        filtredRaces: state.races.filter(race => {
          if (action.payload === Status.Any) {
            return race;
          }
          return action.payload === Status.Active ? race.active : !race.active;
        })
      };
    case ActionTypes.SET_RACES:
      return {
        ...state,
        races: action.payload,
        filtredRaces: action.payload.filter(race => {
          if (state.status === Status.Any) {
            return race;
          }
          return state.status === Status.Active ? race.active : !race.active;
        })
      };
    case ActionTypes.SET_RACE:
      return {
        ...state,
        race: action.payload
      };
    case ActionTypes.SET_ACTIVE_PARTICIPANTS:
      return {
        ...state,
        activeParticipants: action.payload
      };
    case ActionTypes.SET_BET_VALUE:
      const isInvalid =
        action.payload.startsWith('-') ||
        (action.payload !== '0' && action.payload.startsWith('0'));
      return {
        ...state,
        betValue: isInvalid ? state.betValue : action.payload
      };
    case ActionTypes.SET_BETS:
      const {
        payload: { place, participantId }
      } = action;
      const isUsedValue = Object.values(state.bets).includes(participantId);
      if (isUsedValue) {
        const keyToClear = (Object.keys(state.bets) as PlacesType[]).find(
          key => state.bets[key] === participantId
        );

        return {
          ...state,
          bets: {
            ...state.bets,
            [place]: participantId,
            [keyToClear as Places]: null
          }
        };
      }
      return {
        ...state,
        bets: { ...state.bets, [place]: participantId }
      };

    case ActionTypes.CLEAR_RACE_INFO:
      return {
        ...state,
        race: INITIAL_STATE.race,
        activeParticipants: INITIAL_STATE.activeParticipants,
        betValue: INITIAL_STATE.betValue,
        bets: INITIAL_STATE.bets
      };
    case ActionTypes.FETCH_START:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage
};

export const persistedReducer = persistReducer(persistConfig, reducer);
