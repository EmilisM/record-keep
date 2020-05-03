import { RecordStyleRequest, RecordStyle } from 'Types/RecordStyle';
import API from 'API';

export const getRecordStyles = async (data: RecordStyleRequest): Promise<RecordStyle[]> => {
  const recordStyles = await API.get<RecordStyle[]>(
    `/api/record/style?styleId=${data.styleId || ''}&recordId=${data.recordId || ''}`,
  );

  return recordStyles.data;
};
