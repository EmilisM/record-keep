import API from 'API';
import { Genre } from 'Types/Genre';

export const getGenres = async (): Promise<Genre[]> => {
  const genres = await API.get<Genre[]>('/api/genre');

  return genres.data;
};
