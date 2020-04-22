import { ImageCreateModel, ImageUpdateModel, ImageResponse } from 'Types/Image';
import API from 'API';

export const createImage = async (data: ImageCreateModel): Promise<ImageResponse> => {
  return await API.post('/api/image', data);
};

export const updateImage = async ({ id, ...rest }: ImageUpdateModel): Promise<void> => {
  return await API.put(`/api/image/${id}`, rest);
};
