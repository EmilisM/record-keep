import { Image } from './Image';
import { PatchOperations } from './API';

export type CollectionMatchParams = {
  collectionName: string;
};

export interface Collection {
  id: number;
  name: string;
  description: string | null;
  creationDate: Date;
  ownerId: number;
  image: Image | null;
  recordCount: number;
}

export interface CreateCollection {
  name: string;
  description?: string;
  imageId?: number;
}

interface CollectionNameUpdate {
  op: PatchOperations;
  path: '/name';
  value: string;
}

interface CollectionDescriptionUpdate {
  op: PatchOperations;
  path: '/description';
  value: string | null;
}

interface CollectionImageUpdate {
  op: PatchOperations;
  path: '/imageId';
  value: number;
}

export type CollectionUpdates = CollectionNameUpdate | CollectionDescriptionUpdate | CollectionImageUpdate;

export interface UpdateCollection {
  id: number;
  operations: CollectionUpdates[];
}
