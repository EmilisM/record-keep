import { ActionWithPayload, Action } from './State';
import { Record, SelectedRecords } from './Record';

export interface State {
  editModal: boolean;
  newRecordModal: boolean;
  deletionModal: boolean;
  activeRecord: Record | null;
  editRecordModal: boolean;
  collectionDeleteModal: boolean;
  selectedRecords: SelectedRecords;
  deleteAllModal: boolean;
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
  | ActionWithPayload<'activeRecord/set', Record>
  | Action<'editRecordModal/open'>
  | Action<'editRecordModal/close'>
  | Action<'collectionDeleteModal/open'>
  | Action<'collectionDeleteModal/close'>
  | Action<'selectedRecords/clear'>
  | ActionWithPayload<'selectedRecords/add', number>
  | ActionWithPayload<'selectedRecords/remove', number>
  | Action<'deleteAllModal/open'>
  | Action<'deleteAllModal/close'>;
