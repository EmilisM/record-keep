import React, { Dispatch, ReactElement, FormEvent } from 'react';
import Modal from 'Atoms/Modal';
import styled from 'styled-components/macro';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import FieldInput from 'Molecules/FieldInput';
import Label from 'Atoms/Input/InputLabel';
import { State, Actions } from 'Types/User/UserDataState';
import ImagePicker from 'Molecules/ImagePicker';
import FormError from 'Atoms/Error/FormError';
import ChangePasswordForm from 'Molecules/Form/ChangePasswordForm';

const ModalStyled = styled(Modal)``;

const FormContent = styled.form`
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

const FieldInputStyled = styled(FieldInput)`
  width: 300px;

  margin-top: 10px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const FormSeparator = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.text.primaryDarker};
  height: 1px;
`;

const ImagePickerStyled = styled(ImagePicker)`
  margin-top: 10px;
`;

type Props = {
  className?: string;
  isLoading?: boolean;
  imageError?: Error;
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmitProfile: (event: FormEvent<HTMLFormElement>) => void;
  onSubmitImageData: (event: FormEvent<HTMLFormElement>) => void;
  state: State;
  dispatch: Dispatch<Actions>;
};

const EditUserInfoModal = ({
  className,
  isOpen,
  onRequestClose,
  onSubmitProfile,
  onSubmitImageData,
  state,
  dispatch,
  isLoading,
  imageError,
}: Props): ReactElement => (
  <ModalStyled
    className={className}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    title="Edit user info"
    isLoading={isLoading}
  >
    <FormContent onSubmit={onSubmitImageData}>
      <Label color="primaryDarker" fontWeight="semiBold" fontSize="normal">
        Profile image
      </Label>
      <ImagePickerStyled
        crop={state.crop}
        image={state.image}
        onCropChange={(crop, percentCrop) => dispatch({ type: 'UserData/Crop', payload: percentCrop })}
        onImageChange={image => dispatch({ type: 'UserData/Image', payload: image })}
        onImageClear={() => dispatch({ type: 'UserData/Image', payload: null })}
      >
        Choose your image
      </ImagePickerStyled>
      {imageError && <FormError>Error uploading images to server</FormError>}
      <ButtonStyled type="submit" fontWeight="light">
        Submit
      </ButtonStyled>
    </FormContent>
    <FormContent onSubmit={onSubmitProfile}>
      <Label color="primaryDarker" fontWeight="semiBold" fontSize="normal">
        Display name
      </Label>
      <FieldInputStyled
        placeholder="Display name"
        value={state.displayName}
        onChange={event => dispatch({ type: 'UserData/DisplayName', payload: event.target.value })}
      />
      <ButtonStyled type="submit" fontWeight="light">
        Submit
      </ButtonStyled>
    </FormContent>
    <FormSeparator />
    <ChangePasswordForm />
  </ModalStyled>
);

export default EditUserInfoModal;
