import { Record, CreateRecordModel } from 'Types/Record';
import API from 'API';

export const getRecords = async (collectionId?: string): Promise<Record[]> => {
  const records = await API.get<Record[]>(`/api/record?collectionId=${collectionId || ''}`);

  return records.data;
};

export const getRecord = async (id: number): Promise<Record> => {
  const records = await API.get<Record>(`/api/record/${id}`);

  return records.data;
};

export const createRecord = async (data: CreateRecordModel): Promise<void> => {
  return await API.post('/api/record', data);
};

export const deleteRecord = async (id: number): Promise<void> => {
  return await API.delete(`/api/record/${id}`);
};
