import React, { ReactElement, useState, FormEvent } from 'react';
import styled from 'styled-components/macro';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import InputLabel from 'Atoms/Input/InputLabel';
import { Crop } from 'react-image-crop';
import { useMutation } from 'react-query';
import { updateImage, createImage } from 'API/Image';
import ImagePicker from 'Molecules/ImagePicker';
import { updateUserInfo } from 'API/User/index';
import { toast } from 'react-toastify';

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;

  margin: 20px 0;
`;

const ButtonStyled = styled(ButtonDashboard)`
  width: 300px;
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ImagePickerStyled = styled(ImagePicker)`
  margin-top: 10px;
`;

type Props = {
  className?: string;
  profileImageId?: string;
  userInfoRefetch: () => void;
};

const UserImageForm = ({ className, userInfoRefetch, profileImageId }: Props): ReactElement => {
  const [mutateUpdateImage] = useMutation(updateImage);
  const [mutateCreateImage] = useMutation(createImage);
  const [mutateUserInfo] = useMutation(updateUserInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ aspect: 1, x: 0, y: 0, height: 25, width: 25, unit: '%' });

  const notifyUpdate = (): void => {
    toast('Image update complete', { type: 'success' });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (image) {
      const dataReq = {
        height: crop.height || 25,
        width: crop.width || 25,
        x: crop.x || 0,
        y: crop.y || 0,
        data: image.split(',')[1],
      };

      setIsLoading(true);
      if (profileImageId) {
        mutateUpdateImage({ ...dataReq, id: profileImageId }).then(() => {
          userInfoRefetch();
          setIsLoading(false);
          notifyUpdate();
        });
      } else {
        mutateCreateImage(dataReq)
          .then(image => mutateUserInfo([{ op: 'add', path: '/imageId', value: image.id }]))
          .then(() => {
            userInfoRefetch();
            setIsLoading(false);
            notifyUpdate();
          });
      }

      setImage(null);
      setCrop({ ...crop, x: 0, y: 0 });
    }
  };

  return (
    <FormStyled className={className} onSubmit={onSubmit}>
      <InputLabel color="primaryDarker" fontWeight="semiBold" fontSize="normal">
        Profile image
      </InputLabel>
      <ImagePickerStyled
        crop={crop}
        image={image}
        onImageChange={setImage}
        onCropChange={(crop, percentCrop) => setCrop(percentCrop)}
        onImageClear={() => setImage(null)}
      >
        Choose an image
      </ImagePickerStyled>
      <ButtonStyled type="submit" fontWeight="light" disabled={isLoading}>
        Change profile image
      </ButtonStyled>
    </FormStyled>
  );
};

export default UserImageForm;
