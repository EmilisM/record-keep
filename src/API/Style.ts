import API from 'API';
import { Genre } from 'Types/Genre';

export const getStyles = async (genreId?: string): Promise<Genre[]> => {
  const styles = await API.get<Genre[]>(`/api/style?genreId=${genreId || ''}`);

  return styles.data;
};
