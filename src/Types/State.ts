import { UserInfo } from 'Types/User';

interface ActionWithPayload<ActionType, PayloadType> {
  type: ActionType;
  payload: PayloadType;
}

interface Action<ActionType> {
  type: ActionType;
}

interface ActionLoading<ActionType> {
  type: ActionType;
  payload: 'Loading';
}

interface StateError {
  error: string;
  code: string;
}

export const isStateError = <T>(value: StateElement<T>): value is StateError => {
  return (
    value &&
    value !== 'Loading' &&
    (value as StateError).error !== undefined &&
    (value as StateError).code !== undefined
  );
};

export type StateElement<T> = 'Loading' | StateError | T;

export interface State {
  user: StateElement<UserInfo> | null;
}

type UserActions =
  | ActionLoading<'User/Info/Loading'>
  | ActionWithPayload<'User/Info', UserInfo>
  | ActionWithPayload<'User/Info/Error', StateError>;

export type Actions = UserActions;
