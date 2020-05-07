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
