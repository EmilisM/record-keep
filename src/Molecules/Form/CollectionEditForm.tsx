import React, { ReactElement } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import styled from 'styled-components/macro';
import InputLabel from 'Atoms/Input/InputLabel';
import FieldInput from 'Molecules/FieldInput';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { updateCollection as updateCollectionAPI } from 'API/Collection';
import { UpdateCollection } from 'Types/Collection';

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

const InputLabelStyled = styled(InputLabel)`
  margin-top: 10px;
`;

interface CollectionFields {
  name: string;
  description: string;
}

type Props = {
  className?: string;
  description: string | null;
  name: string;
  collectionsRefetch: () => void;
  id: number;
};

const CollectionEditForm = ({ className, collectionsRefetch, name, description, id }: Props): ReactElement => {
  const [updateCollection] = useMutation(updateCollectionAPI, { throwOnError: true });

  const initialValues: CollectionFields = {
    name: name,
    description: description || '',
  };

  const onSubmit = (values: CollectionFields, helpers: FormikHelpers<CollectionFields>): void => {
    const updateRequest: UpdateCollection = {
      id,
      operations: [
        {
          op: 'add',
          path: '/name',
          value: values.name,
        },
        {
          op: 'add',
          path: '/description',
          value: values.description,
        },
      ],
    };

    updateCollection(updateRequest)
      .then(() => {
        collectionsRefetch();
        helpers.setSubmitting(false);
        toast.success('User info update complete');
      })
      .catch(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormStyled className={className}>
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Name
          </InputLabelStyled>
          <FieldInputStyled name="name" placeholder="Name" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Description
          </InputLabelStyled>
          <FieldInputStyled name="description" placeholder="Description" />
          <ButtonStyled type="submit" fontWeight="light" disabled={isSubmitting}>
            Change collection info
          </ButtonStyled>
        </FormStyled>
      )}
    </Formik>
  );
};

export default CollectionEditForm;
