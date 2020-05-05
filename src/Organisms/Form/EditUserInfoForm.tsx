import React, { ReactElement } from 'react';
import { Formik, FormikHelpers } from 'formik';
import styled from 'styled-components/macro';
import InputLabel from 'Atoms/Input/InputLabel';
import FieldInput from 'Molecules/FieldInput';
import { useMutation } from 'react-query';
import { updateUserInfo as updateUserInfoAPI } from 'API/User';
import { UpdateUserInfo, UserInfo } from 'Types/User';
import { toast } from 'react-toastify';
import Form from 'Atoms/Form/Form';
import FormButton from 'Atoms/Form/FormButton';

const FieldInputStyled = styled(FieldInput)`
  margin-top: 10px;
`;

interface UserInfoFields {
  displayName: string;
}

type Props = {
  className?: string;
  displayName?: string | null;
  userInfoRefetch: () => Promise<UserInfo>;
};

const EditUserInfoForm = ({ className, displayName, userInfoRefetch }: Props): ReactElement => {
  const [updateUserInfo] = useMutation(updateUserInfoAPI, { throwOnError: true });

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

    updateUserInfo(updateRequest)
      .then(() => userInfoRefetch())
      .then(() => {
        helpers.setSubmitting(false);
        toast.success('User update complete');
      })
      .catch(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className={className}>
          <InputLabel color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Display name
          </InputLabel>
          <FieldInputStyled name="displayName" placeholder="Display name" />
          <FormButton type="submit" fontWeight="light" disabled={isSubmitting}>
            Change user info
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserInfoForm;
