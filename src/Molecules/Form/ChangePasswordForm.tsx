import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import { FormikErrors, Formik, Form, FormikHelpers } from 'formik';
import FormInput from 'Atoms/Input/FormInput';
import FormError from 'Atoms/Error/FormError';
import { useMutation } from 'react-query';
import { changePassword as changePasswordAPI } from 'API/User';
import { ChangePasswordErrorResponse } from 'Types/User';
import { AxiosError } from 'axios';
import { getErrorMessage } from 'Types/Error';
import GlobalFormError from 'Atoms/Error/GlobalFormError';
import { toast } from 'react-toastify';

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

const GlobalFormErrorStyled = styled(GlobalFormError)`
  margin-top: 20px;
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
  const [changePassword] = useMutation(changePasswordAPI, { throwOnError: true });
  const initialValues: ChangePasswordFields = {
    existingPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const onSubmit = (values: ChangePasswordFields, helpers: FormikHelpers<ChangePasswordFields>): void => {
    changePassword({
      oldPassword: values.existingPassword,
      password: values.newPassword,
      repeatPassword: values.repeatNewPassword,
    })
      .then(() => {
        helpers.resetForm();
        helpers.setSubmitting(false);
        toast.success('Change password complete');
      })
      .catch((err: AxiosError<ChangePasswordErrorResponse>) => {
        helpers.setErrors({
          existingPassword: getErrorMessage(err.response?.data.errors.oldPassword),
          newPassword: getErrorMessage(err.response?.data.errors.password),
          repeatNewPassword: getErrorMessage(err.response?.data.errors.repeatPassword),
          form: getErrorMessage(err.response?.data.errors.form),
        });
        helpers.setSubmitting(false);
      });
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
          <GlobalFormErrorStyled />
          <ButtonStyled disabled={isSubmitting} type="submit" fontWeight="light">
            Change password
          </ButtonStyled>
        </FormContent>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
