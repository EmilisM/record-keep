import React, { ReactElement, ReactNode, ChangeEvent } from 'react';
import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';
import InputLabel from 'Atoms/Input/InputLabel';
import ReactCrop, { Crop, PercentCrop } from 'react-image-crop';
import { ReactComponent as Close } from 'Assets/Close.svg';
import 'react-image-crop/dist/ReactCrop.css';
import InvisibleButton from 'Atoms/Button/InvisibleButton';

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
  display: flex;
  flex-direction: row;
  align-items: center;
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

const CloseStyled = styled(Close)`
  width: 30px;
  height: 30px;

  fill: ${props => props.theme.colors.text.primaryDarker};
`;

const InvisibleButtonStyled = styled(InvisibleButton)`
  display: flex;
  margin-left: 20px;
`;

type Props = {
  className?: string;
  onCropComplete?: () => void;
  children: ReactNode;
  crop: Crop;
  image?: string | null;
  onCropChange: (crop: Crop, percentCrop: PercentCrop) => void;
  onImageChange: (image: string) => void;
  onImageClear?: () => void;
};

const ImagePicker = ({
  className,
  children,
  onCropComplete,
  crop,
  image,
  onCropChange,
  onImageChange,
  onImageClear,
}: Props): ReactElement => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files || event.target.files.length <= 0) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        if (typeof reader.result === 'string') {
          onImageChange(reader.result);
        }
      },
      false,
    );
    reader.readAsDataURL(event.target.files[0]);
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
          src={image || ''}
          onChange={onCropChange}
          onComplete={onCropComplete}
        />
      )}
      <ButtonContainer data-has-image={!!image}>
        <InputLabelStyled htmlFor="image-picker" color="primaryLight" fontWeight="light">
          {children}
        </InputLabelStyled>
        {onImageClear && image && (
          <InvisibleButtonStyled onClick={onImageClear}>
            <CloseStyled />
          </InvisibleButtonStyled>
        )}
        <InputStyled name="image-picker" id="image-picker" type="file" accept="image/*" onChange={onChange} />
      </ButtonContainer>
    </ImagePickerStyled>
  );
};

export default ImagePicker;
