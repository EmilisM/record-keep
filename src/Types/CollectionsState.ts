import { ActionWithPayload, Action } from './State';
import { Collection } from './Collection';

export interface State {
  editModal: boolean;
  deletionModal: boolean;
  isCreating: boolean;
  searchQuery: string;
  newCollectionName: string;
  activeCollection: Collection | null;
}

export type Actions =
  | Action<'editModal/open'>
  | Action<'editModal/close'>
  | Action<'deletionModal/open'>
  | Action<'deletionModal/close'>
  | ActionWithPayload<'isCreating/set', boolean>
  | ActionWithPayload<'searchQuery/set', string>
  | ActionWithPayload<'newCollectionName/set', string>
  | ActionWithPayload<'activeCollection/set', Collection>;
