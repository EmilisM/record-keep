import { Collection, CreateCollection, UpdateCollection, CollectionDeleteRequest } from 'Types/Collection';
import API from 'API';

export const getCollections = async (name?: string): Promise<Collection[]> => {
  const collections = await API.get(`/api/collection?name=${name}`);

  return collections.data;
};

export const createCollection = async (request: CreateCollection): Promise<void> => {
  return await API.post('/api/collection', request);
};

export const updateCollection = async (request: UpdateCollection): Promise<void> => {
  return await API.patch(`/api/collection/${request.id}`, request.operations);
};

export const deleteCollection = async (request: CollectionDeleteRequest): Promise<void> => {
  return await API.delete(`/api/collection/${request.id}?destinationId=${request.destinationId || ''}`);
};
