import { ImageCreateModel, ImageUpdateModel, ImageResponse } from 'Types/Image';
import API from 'API';

export const createImage = async (data: ImageCreateModel): Promise<ImageResponse> => {
  const imageResponse = await API.post<ImageResponse>('/api/image', data);

  return imageResponse.data;
};

export const updateImage = async ({ id, ...rest }: ImageUpdateModel): Promise<void> => {
  return await API.put(`/api/image/${id}`, rest);
};
