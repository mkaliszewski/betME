import { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  State,
  Reducer,
  initialState as reducerInitialState,
  Action
} from './reducer';

const Store = createContext<[State, React.Dispatch<Action>]>([
  { ...reducerInitialState },
  () => {}
]);

export const useStore = () => useContext(Store);

interface StoreProviderProps {
  children: ReactNode;
  initialState: State;
  reducer: Reducer;
}
export const StoreProvider = ({
  children,
  initialState,
  reducer
}: StoreProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};
