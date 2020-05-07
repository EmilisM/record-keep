import { Collection } from './Collection';
import { Record } from './Record';

export type UserActivityActionName =
  | 'CollectionCreate'
  | 'CollectionUpdate'
  | 'CollectionDelete'
  | 'CollectionDeleteWithMove'
  | 'RecordCreate'
  | 'RecordDelete'
  | 'RecordUpdate'
  | 'ImageCreate'
  | 'ImageUpdate'
  | 'UserUpdate'
  | 'PasswordChange';

export interface UserActivityAction {
  id: number;
  name: UserActivityActionName;
}

export interface UserActivity {
  id: number;
  timestamp: Date;
  action: UserActivityAction;
  collection: Collection | null;
  record: Record | null;
}
