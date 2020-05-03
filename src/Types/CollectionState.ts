import { ActionWithPayload, Action } from './State';
import { Record } from './Record';

export interface State {
  editModal: boolean;
  newRecordModal: boolean;
  deletionModal: boolean;
  activeRecord: Record | null;
}

export type Actions =
  | ActionWithPayload<'editModal/set', boolean>
  | Action<'editModal/open'>
  | Action<'editModal/close'>
  | ActionWithPayload<'newRecordModal/set', boolean>
  | Action<'newRecordModal/open'>
  | Action<'newRecordModal/close'>
  | Action<'deletionModal/open'>
  | Action<'deletionModal/close'>
  | ActionWithPayload<'activeRecord/set', Record>;
