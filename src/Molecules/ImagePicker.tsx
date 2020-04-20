import React, { ReactElement, ReactNode, useState, ChangeEvent } from 'react';
import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';
import InputLabel from 'Atoms/Input/InputLabel';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImagePickerStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabelStyled = styled(InputLabel)`
  background-color: ${props => props.theme.colors.background.secondaryDark};

  padding: 6px 10px;
  border-radius: 8px;
  display: block;

  cursor: pointer;
`;

const InputStyled = styled(Input)`
  display: none;
`;

const ButtonContainer = styled.div`
  width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  &[data-has-image='true'] {
    margin-top: 10px;
  }
`;

const ReactCropStyled = styled(ReactCrop)`
  max-width: 512px;
  border-radius: 8px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

type Props = {
  className?: string;
  onCropComplete?: () => void;
  children: ReactNode;
};

const ImagePicker = ({ className, children, onCropComplete }: Props): ReactElement => {
  const [image, setImage] = useState<string>();
  const [crop, setCrop] = useState<Crop>({ aspect: 1, x: 0, y: 0, width: 128, height: 128 });

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files || event.target.files.length <= 0) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      },
      false,
    );
    reader.readAsDataURL(event.target.files[0]);
  };

  const onCropChange = (newCrop: Crop): void => {
    setCrop(newCrop);
  };

  return (
    <ImagePickerStyled className={className}>
      {image && (
        <ReactCropStyled
          keepSelection
          circularCrop
          minWidth={128}
          minHeight={128}
          crop={crop}
          src={image}
          onChange={onCropChange}
          onComplete={onCropComplete}
        />
      )}
      <ButtonContainer data-has-image={!!image}>
        <InputLabelStyled htmlFor="image-picker" color="primaryLight" fontWeight="light">
          {children}
        </InputLabelStyled>
        <InputStyled id="image-picker" type="file" accept="image/*" onChange={onChange} />
      </ButtonContainer>
    </ImagePickerStyled>
  );
};

export default ImagePicker;
