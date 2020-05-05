import { ActionWithPayload, Action } from './State';
import { Record } from './Record';

export interface State {
  searchQuery: string;
  deleteModal: boolean;
  editModal: boolean;
  activeRecord: Record | null;
}

export type Actions =
  | ActionWithPayload<'searchQuery/set', string>
  | Action<'deleteModal/open'>
  | Action<'deleteModal/close'>
  | Action<'editModal/open'>
  | Action<'editModal/close'>
  | ActionWithPayload<'activeRecord/set', Record>;
