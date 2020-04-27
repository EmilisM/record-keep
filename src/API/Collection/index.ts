import { Collection, CreateCollection, UpdateCollection } from 'Types/Collection';
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
