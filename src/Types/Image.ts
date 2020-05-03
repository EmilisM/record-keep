import { Crop } from 'react-image-crop';

export interface Image {
  id: number;
  data: string;
}

//TODO: Naming
export interface ImageCreateModel {
  data: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageUpdateModel {
  id: number;
  data: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageResponse {
  id: number;
  data: string;
}

export const getImageCreateRequest = (crop: Crop, image: string): ImageCreateModel => ({
  height: crop.height || 25,
  width: crop.width || 25,
  x: crop.x || 0,
  y: crop.y || 0,
  data: image.split(',')[1],
});
