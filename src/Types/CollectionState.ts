import { ActionWithPayload, Action } from './State';

export interface State {
  editModal: boolean;
}

export type Actions =
  | ActionWithPayload<'editModal/set', boolean>
  | Action<'editModal/open'>
  | Action<'editModal/close'>;
