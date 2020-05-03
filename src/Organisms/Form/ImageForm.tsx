import React, { ReactElement, useState, FormEvent } from 'react';
import styled from 'styled-components/macro';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import InputLabel from 'Atoms/Input/InputLabel';
import { Crop } from 'react-image-crop';
import ImagePicker from 'Molecules/ImagePicker';
import { toast } from 'react-toastify';
import { ImageCreateModel, getImageCreateRequest } from 'Types/Image';

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
  title: string;
  buttonLabel: string;
  inputLabel: string;
  onSubmit: (data: ImageCreateModel) => Promise<void>;
};

const ImageForm = ({ className, title, buttonLabel, inputLabel, onSubmit }: Props): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ aspect: 1, x: 0, y: 0, height: 25, width: 25, unit: '%' });

  const onAfterUpdate = (): void => {
    setIsLoading(false);
    toast.success('Image update complete');
    setImage(null);
    setCrop({ ...crop, x: 0, y: 0 });
  };

  const onSubmitForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!image) {
      return;
    }

    const dataReq = getImageCreateRequest(crop, image);

    setIsLoading(true);
    onSubmit(dataReq).then(() => onAfterUpdate());
  };

  return (
    <FormStyled className={className} onSubmit={onSubmitForm}>
      <InputLabel color="primaryDarker" fontWeight="semiBold" fontSize="normal">
        {title}
      </InputLabel>
      <ImagePickerStyled
        crop={crop}
        image={image}
        onImageChange={setImage}
        onCropChange={(crop, percentCrop) => setCrop(percentCrop)}
        onImageClear={() => setImage(null)}
      >
        {inputLabel}
      </ImagePickerStyled>
      <ButtonStyled type="submit" fontWeight="light" disabled={isLoading}>
        {buttonLabel}
      </ButtonStyled>
    </FormStyled>
  );
};

export default ImageForm;
