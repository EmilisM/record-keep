import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import { FormikErrors, Formik, Form, FormikHelpers } from 'formik';
import FormInput from 'Atoms/Input/FormInput';
import FormError from 'Atoms/Error/FormError';

type Props = {
  className?: string;
};

const FormContent = styled(Form)`
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

const FormErrorStyled = styled(FormError)`
  margin-top: 10px;
`;

interface ChangePasswordFields {
  existingPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  form?: string;
}

const validate = (values: ChangePasswordFields): FormikErrors<ChangePasswordFields> => {
  const errors: FormikErrors<ChangePasswordFields> = {};

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
  const initialValues: ChangePasswordFields = {
    existingPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const onSubmit = (values: ChangePasswordFields, helpers: FormikHelpers<ChangePasswordFields>): void => {
    console.log(values);

    helpers.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormContent className={className}>
          <H color="primaryDarker" fontSize="regular" fontWeight="semiBold" level="3">
            Change your password
          </H>
          <FormInputStyled
            id="existingPassword"
            placeholder="Existing password"
            name="existingPassword"
            type="password"
            label="Existing password"
          />
          <FormErrorStyled name="existingPassword" />
          <FormInputStyled
            id="newPassword"
            placeholder="New password"
            name="newPassword"
            type="password"
            label="New password"
          />
          <FormErrorStyled name="newPassword" />
          <FormInputStyled
            id="repeatNewPassword"
            placeholder="Repeat new password"
            name="repeatNewPassword"
            type="password"
            label="Repeat new password"
          />
          <FormErrorStyled name="repeatNewPassword" />
          <ButtonStyled disabled={isSubmitting} type="submit" fontWeight="light">
            Change password
          </ButtonStyled>
        </FormContent>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
