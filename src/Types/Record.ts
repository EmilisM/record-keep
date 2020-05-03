import { Image } from './Image';
import { RecordType } from './RecordType';
import { Moment } from 'moment';

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
