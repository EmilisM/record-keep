import { RecordType } from 'Types/RecordType';
import API from 'API';

export const getRecordTypes = async (): Promise<RecordType[]> => {
  const recordResponse = await API.get<RecordType[]>('/api/record/type');

  return recordResponse.data;
};
