import { State, Actions } from 'Types/State';
import { createContext, useContext, Dispatch } from 'react';

export const MainStateContext = createContext<State | null>(null);

export const DispatchContext = createContext<Dispatch<Actions> | null>(null);

export const initialState: State = {
  user: null,
};

export function mainReducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'User/Info/Loading':
    case 'User/Info':
    case 'User/Info/Error': {
      return {
        ...state,
        user: action.payload,
      };
    }
  }
}

export const useMainState = (): State => {
  const state = useContext(MainStateContext);
  if (!state) {
    throw new Error('MainStateContext is not initialized');
  }

  return state;
};

export const useDispatch = (): Dispatch<Actions> => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error('DispatchContext is not initialized');
  }

  return dispatch;
};
