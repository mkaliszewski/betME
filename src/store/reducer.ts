import { Actions } from './actions';
import { Status, Race, Bets, Places } from '../types';

interface ActionA {
  type: Actions.SET_STATUS;
  payload: Status;
}
interface ActionB {
  type: Actions.SET_RACES;
  payload: Race[];
}
interface ActionC {
  type: Actions.SET_BET_VALUE;
  payload: string;
}
interface ActionD {
  type: Actions.SET_BET;
  payload: Bets;
}

export type Action = ActionA | ActionB | ActionC | ActionD;

export interface State {
  status: Status;
  races: Race[];
  filtredRaces: Race[];
  betValue: string;
  bets: Bets;
}
export type Reducer = (state: State, action: Action) => State;

export const initialState = {
  status: Status.Any,
  races: [],
  filtredRaces: [],
  betValue: '0',
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
        races: action.payload,
        filtredRaces: action.payload.filter(race => {
          if (state.status === Status.Any) {
            return race;
          }
          return state.status === Status.Active ? race.active : !race.active;
        })
      };
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
