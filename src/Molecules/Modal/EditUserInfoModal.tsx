import React, { ReactElement, FormEvent } from 'react';
import Modal from 'Atoms/Modal';
import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import H from 'Atoms/Text/H';
import EditableP from 'Molecules/FieldInput';
import Label from 'Atoms/Input/InputLabel';
import { State, Actions } from 'Types/UserDataState';
import ImagePicker from 'Molecules/ImagePicker';

const ModalStyled = styled(Modal)``;

const FormContent = styled.form`
  display: flex;
  flex-direction: column;

  margin: 20px 0;
`;

const InputStyled = styled(Input)`
  border: 1px solid ${props => props.theme.colors.text.primaryDarker};
  width: 300px;
  margin-top: 10px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ButtonStyled = styled(ButtonDashboard)`
  width: 300px;
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const EditablePStyled = styled(EditableP)`
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
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmitProfile: (event: FormEvent<HTMLFormElement>) => void;
  onSubmitPasswordChange: (event: FormEvent<HTMLFormElement>) => void;
  state: State;
  onChange: (value: string, type: Actions['type']) => void;
};

const EditUserInfoModal = ({
  className,
  isOpen,
  onRequestClose,
  onSubmitProfile,
  onSubmitPasswordChange,
  state,
  onChange,
}: Props): ReactElement => (
  <ModalStyled className={className} isOpen={isOpen} onRequestClose={onRequestClose} title="Edit user info">
    <FormContent onSubmit={onSubmitProfile}>
      <Field>
        <Label color="primaryDarker" fontWeight="semiBold" fontSize="small">
          Profile image
        </Label>
        <ImagePickerStyled>Choose your image</ImagePickerStyled>
      </Field>
      <Field>
        <Label color="primaryDarker" fontWeight="semiBold" fontSize="small">
          Display name
        </Label>
        <EditablePStyled
          placeholder="Display name"
          value={state.displayName}
          onChange={event => onChange(event.target.value, 'UserData/DisplayName')}
        />
      </Field>
      <ButtonStyled type="submit" fontWeight="light">
        Submit
      </ButtonStyled>
    </FormContent>
    <FormSeparator />
    <FormContent onSubmit={onSubmitPasswordChange}>
      <H color="primaryDarker" fontSize="regular" fontWeight="semiBold" level="3">
        Change your password
      </H>
      <InputStyled
        color="primaryDarker"
        placeholder="Old password"
        fontSize="normal"
        type="password"
        onChange={event => onChange(event.target.value, 'UserData/OldPassword')}
      />
      <InputStyled
        color="primaryDarker"
        placeholder="New password"
        fontSize="normal"
        type="password"
        onChange={event => onChange(event.target.value, 'UserData/NewPassword')}
      />
      <InputStyled
        color="primaryDarker"
        placeholder="Repeat new password"
        fontSize="normal"
        type="password"
        onChange={event => onChange(event.target.value, 'UserData/RepeatNewPassword')}
      />
      <ButtonStyled type="submit" fontWeight="light">
        Submit
      </ButtonStyled>
    </FormContent>
  </ModalStyled>
);

export default EditUserInfoModal;
