import { Image } from './Image';
import { RecordType } from './RecordType';
import { Moment } from 'moment';
import { PatchOperations } from './API';
import { RecordStyle } from './RecordStyle';
import { RecordFormat } from './RecordFormat';

export interface Record {
  id: number;
  artist: string;
  name: string;
  description: string | null;
  creationDate: Date;
  year: Date;
  rating: number | null;
  recordLength: string | null;
  label: string;
  collectionId: number;
  image: Image | null;
  recordType: RecordType;
  recordFormat: RecordFormat;
  recordStyle: RecordStyle[];
}

export interface CreateRecordModel {
  artist: string;
  name: string;
  description?: string;
  collectionId: number;
  imageId?: number;
  recordTypeId: string;
  recordFormatId: string;
  styleIds: string[];
  label: string;
  year: Moment;
  recordLength?: string;
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
  path: '/year';
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
  value: string;
}

interface RecordStylesUpdate {
  op: PatchOperations;
  path: '/styleIds';
  value: string[];
}

interface RecordFormatUpdate {
  op: PatchOperations;
  path: '/recordFormatId';
  value: string;
}

interface RecordRatingUpdate {
  op: PatchOperations;
  path: '/rating';
  value: number;
}

interface RecordLengthUpdate {
  op: PatchOperations;
  path: '/recordLength';
  value: string | null;
}

export type RecordUpdates =
  | RecordNameUpdate
  | RecordArtistUpdate
  | RecordDescriptionUpdate
  | RecordLabelUpdate
  | RecordYearUpdate
  | RecordImageUpdate
  | RecordTypeUpdate
  | RecordStylesUpdate
  | RecordFormatUpdate
  | RecordRatingUpdate
  | RecordLengthUpdate;

export interface UpdateRecordModel {
  id: number;
  operations: RecordUpdates[];
}

export interface RecordMatchParams {
  recordId: string;
}

export interface RecordGenre {
  name: string;
  value: number;
}

export interface SelectedRecords {
  [K: number]: true;
}

export interface RecordProgression {
  name: string;
  value: number;
}
