import { Record, CreateRecordModel } from 'Types/Record';
import API from 'API';

export const getRecords = async (): Promise<Record[]> => {
  const records = await API.get<Record[]>('/api/record');

  return records.data;
};

export const getRecord = async (id: number): Promise<Record> => {
  const records = await API.get<Record>(`/api/record/${id}`);

  return records.data;
};

export const createRecord = async (data: CreateRecordModel): Promise<void> => {
  return await API.post('/api/record', data);
};
