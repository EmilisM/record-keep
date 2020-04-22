export interface Image {
  id: string;
  data: string;
}

export interface ImageCreateModel {
  data: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageUpdateModel {
  id: string;
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
