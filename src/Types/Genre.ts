export interface Genre {
  id: number;
  name: string;
}

export type Genres = {
  [t: string]: number;
};

export type GenreProgression = {
  name: string;
  genres: Genres;
};
