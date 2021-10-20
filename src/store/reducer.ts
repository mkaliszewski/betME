import { Actions } from './actions';
import { Status, Race, Participant, Bets, Places } from '../types';

interface ActionA {
  type: Actions.SET_STATUS;
  payload: Status;
}
interface ActionB {
  type: Actions.SET_RACES;
  payload: Race[];
}
interface ActionC {
  type: Actions.SET_FILTRED_RACES;
  payload: Race[];
}
interface ActionD {
  type: Actions.SET_RACE;
  payload: Race;
}
interface ActionE {
  type: Actions.SET_PARTICIPANTS;
  payload: Participant[];
}
interface ActionF {
  type: Actions.SET_ACTIVE_PARTICIPANTS;
  payload: Participant[];
}
interface ActionG {
  type: Actions.SET_BET_VALUE;
  payload: string;
}
interface ActionH {
  type: Actions.SET_BET;
  payload: Bets;
}

export type Action =
  | ActionA
  | ActionB
  | ActionC
  | ActionD
  | ActionE
  | ActionF
  | ActionG
  | ActionH;

export interface State {
  status: Status;
  races: Race[];
  filtredRaces: Race[];
  participants: Participant[];
  race: Race | undefined;
  activeParticipants: Participant[];
  betValue: string;
  bets: Bets;
}
export type Reducer = (state: State, action: Action) => State;

export const initialState = {
  status: Status.Any,
  races: [],
  filtredRaces: [],
  participants: [],
  race: undefined,
  activeParticipants: [],
  betValue: '',
  bets: { [Places.First]: null, [Places.Second]: null, [Places.Third]: null }
};

export const reducer = (state: State = initialState, action: Action) => {
  let newState: State = initialState;
  switch (action.type) {
    case Actions.SET_STATUS:
      newState = {
        ...state,
        status: action.payload,
        filtredRaces: state.races.filter(race => {
          if (action.payload === Status.Any) {
            return race;
          }
          return action.payload === Status.Active ? race.active : !race.active;
        })
      };
      break;
    case Actions.SET_RACES:
      newState = {
        ...state,
        races: action.payload
      };
      break;
    case Actions.SET_FILTRED_RACES:
      newState = {
        ...state,
        filtredRaces: action.payload
      };
      break;
    case Actions.SET_RACE:
      newState = {
        ...state,
        race: action.payload
      };
      break;
    case Actions.SET_PARTICIPANTS:
      newState = {
        ...state,
        participants: action.payload
      };
      break;
    case Actions.SET_ACTIVE_PARTICIPANTS:
      newState = state;
      break;
    case Actions.SET_BET_VALUE:
      newState = {
        ...state,
        betValue: action.payload
      };
      break;
    case Actions.SET_BET:
      newState = {
        ...state,
        bets: action.payload
      };
      break;
    default:
      newState = state;
      break;
  }
  localStorage.setItem('state', JSON.stringify(newState));
  return newState;
};
