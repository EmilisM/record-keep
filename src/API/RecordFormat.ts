import { RecordFormat } from 'Types/RecordFormat';
import API from 'API';

export const getRecordFormats = async (): Promise<RecordFormat[]> => {
  const recordResponse = await API.get<RecordFormat[]>('/api/record/format');

  return recordResponse.data;
};
