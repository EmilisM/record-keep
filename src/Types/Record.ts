import { Image } from './Image';
import { RecordType } from './RecordType';
import { Moment } from 'moment';
import { PatchOperations } from './API';

export interface Record {
  id: number;
  artist: string;
  name: string;
  description: string | null;
  creationDate: Date;
  year: Date;
  label: string;
  collectionId: number;
  image: Image | null;
  recordType: RecordType;
}

export interface CreateRecordModel {
  artist: string;
  name: string;
  description?: string;
  collectionId: number;
  imageId?: number;
  recordTypeId: string;
  styleIds: string[];
  label: string;
  year: Moment;
}

interface RecordNameUpdate {
  op: PatchOperations;
  path: '/name';
  value: string;
}

interface RecordArtistUpdate {
  op: PatchOperations;
  path: '/artist';
  value: string;
}

interface RecordDescriptionUpdate {
  op: PatchOperations;
  path: '/description';
  value: string | null;
}

interface RecordLabelUpdate {
  op: PatchOperations;
  path: '/label';
  value: string;
}

interface RecordYearUpdate {
  op: PatchOperations;
  path: '/label';
  value: Moment;
}

interface RecordImageUpdate {
  op: PatchOperations;
  path: '/imageId';
  value: number;
}

interface RecordTypeUpdate {
  op: PatchOperations;
  path: '/recordTypeId';
  value: number;
}

export type RecordUpdates =
  | RecordNameUpdate
  | RecordArtistUpdate
  | RecordDescriptionUpdate
  | RecordLabelUpdate
  | RecordYearUpdate
  | RecordImageUpdate
  | RecordTypeUpdate;

export interface UpdateRecordModel {
  id: number;
  operations: RecordUpdates[];
}
