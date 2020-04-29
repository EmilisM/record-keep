import { Image } from './Image';

export interface Record {
  id: number;
  artist: string;
  name: string;
  description: string | null;
  creationDate: Date;
  collectionId: number;
  image: Image | null;
}
