import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import { FormikErrors, Formik } from 'formik';
import FormInput from 'Atoms/Input/FormInput';

type Props = {
  className?: string;
};

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

const FormInputStyled = styled(FormInput)`
  margin-top: 20px;
`;

interface Form {
  existingPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

const validate = (values: Form): FormikErrors<Form> => {
  const errors: FormikErrors<Form> = {};

  if (!values.existingPassword) {
    errors.existingPassword = 'Existing password is required';
  }

  if (!values.newPassword) {
    errors.newPassword = 'New password is required';
  }

  if (!values.repeatNewPassword) {
    errors.repeatNewPassword = 'Repeat new password is required';
  }

  return errors;
};

const ChangePasswordForm = ({ className }: Props): ReactElement => {
  const initialValues: Form = {
    existingPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const onSubmit = (values: Form): void => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      <FormContent className={className}>
        <H color="primaryDarker" fontSize="regular" fontWeight="semiBold" level="3">
          Change your password
        </H>
        <FormInputStyled id="existingPassword" name="existingPassword" type="password" label="Existing password" />
        <FormInputStyled id="newPassword" name="newPassword" type="password" label="New password" />
        <FormInputStyled id="repeatNewPassword" name="repeatNewPassword" type="password" label="Repeat new password" />
        <ButtonStyled type="submit" fontWeight="light">
          Change password
        </ButtonStyled>
      </FormContent>
    </Formik>
  );
};

export default ChangePasswordForm;
