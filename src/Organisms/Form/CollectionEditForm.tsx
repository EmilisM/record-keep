import React, { ReactElement } from 'react';
import { Formik, Form, FormikHelpers, FormikErrors } from 'formik';
import styled from 'styled-components/macro';
import InputLabel from 'Atoms/Input/InputLabel';
import FieldInput from 'Molecules/FieldInput';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { updateCollection as updateCollectionAPI } from 'API/Collection';
import { UpdateCollection, Collection } from 'Types/Collection';
import FormError from 'Atoms/Error/FormError';

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
  refetch: () => void;
  collection: Collection;
};

const validate = (values: CollectionFields): FormikErrors<CollectionFields> => {
  const errors: FormikErrors<CollectionFields> = {};

  if (!values.name) {
    errors.name = 'Name field is required';
  }

  return errors;
};

const CollectionEditForm = ({ className, refetch, collection }: Props): ReactElement => {
  const [updateCollection] = useMutation(updateCollectionAPI, { throwOnError: true });

  const initialValues: CollectionFields = {
    name: collection.name,
    description: collection.description || '',
  };

  const onSubmit = (values: CollectionFields, helpers: FormikHelpers<CollectionFields>): void => {
    const updateRequest: UpdateCollection = {
      id: collection.id,
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
        refetch();
        helpers.setSubmitting(false);
        toast.success('Collection update complete');
      })
      .catch(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormStyled className={className}>
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Name
          </InputLabelStyled>
          <FieldInputStyled name="name" placeholder="Name" />
          <FormError name="name" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Description
          </InputLabelStyled>
          <FieldInputStyled name="description" placeholder="Description" />
          <FormError name="description" />
          <ButtonStyled type="submit" fontWeight="light" disabled={isSubmitting}>
            Change collection info
          </ButtonStyled>
        </FormStyled>
      )}
    </Formik>
  );
};

export default CollectionEditForm;
