import React, { ReactElement } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import styled from 'styled-components/macro';
import InputLabel from 'Atoms/Input/InputLabel';
import FieldInput from 'Molecules/FieldInput';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import { useMutation } from 'react-query';
import { updateUserInfo as updateUserInfoAPI } from 'API/User';
import { UpdateUserInfo } from 'Types/User';

const FormStyled = styled(Form)`
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

interface UserInfoFields {
  displayName: string;
}

type Props = {
  className?: string;
  displayName?: string | null;
  userInfoRefetch: () => void;
};

const EditUserInfoForm = ({ className, displayName, userInfoRefetch }: Props): ReactElement => {
  const [updateUserInfo] = useMutation(updateUserInfoAPI);

  const initialValues: UserInfoFields = {
    displayName: displayName || '',
  };

  const onSubmit = (values: UserInfoFields, helpers: FormikHelpers<UserInfoFields>): void => {
    const updateRequest: UpdateUserInfo[] = [
      {
        op: 'add',
        path: '/displayName',
        value: values.displayName,
      },
    ];

    updateUserInfo(updateRequest).then(() => {
      userInfoRefetch();
      helpers.setSubmitting(false);
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormStyled className={className}>
          <InputLabel color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Display name
          </InputLabel>
          <FieldInputStyled name="displayName" placeholder="Display name" />
          <ButtonStyled type="submit" fontWeight="light" disabled={isSubmitting}>
            Change user info
          </ButtonStyled>
        </FormStyled>
      )}
    </Formik>
  );
};

export default EditUserInfoForm;
