import { ActionWithPayload, Action } from './State';

export interface State {
  editModal: boolean;
  newRecordModal: boolean;
}

export type Actions =
  | ActionWithPayload<'editModal/set', boolean>
  | Action<'editModal/open'>
  | Action<'editModal/close'>
  | ActionWithPayload<'newRecordModal/set', boolean>
  | Action<'newRecordModal/open'>
  | Action<'newRecordModal/close'>;
