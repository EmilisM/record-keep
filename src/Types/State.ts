export interface ActionWithPayload<ActionType, PayloadType> {
  type: ActionType;
  payload: PayloadType;
}

export interface Action<ActionType> {
  type: ActionType;
}

export interface ActionLoading<ActionType> {
  type: ActionType;
  payload: 'Loading';
}

interface StateError {
  message: string;
  code: string;
}

export const isStateError = <T>(value: StateElement<T>): value is StateError => {
  return (
    value &&
    value !== 'Loading' &&
    (value as StateError).message !== undefined &&
    (value as StateError).code !== undefined
  );
};

export const isLoading = <T>(value: StateElement<T>): value is 'Loading' => {
  return value && typeof value === 'string' && value === 'Loading';
};

export type StateElement<T> = 'Loading' | StateError | T;
