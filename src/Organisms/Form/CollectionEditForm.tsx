import React, { ReactElement } from 'react';
import { Formik, FormikHelpers, FormikErrors } from 'formik';
import styled from 'styled-components/macro';
import InputLabel from 'Atoms/Input/InputLabel';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { updateCollection as updateCollectionAPI } from 'API/Collection';
import { UpdateCollection, Collection } from 'Types/Collection';
import FormError from 'Atoms/Error/FormError';
import FormButton from 'Atoms/Form/FormButton';
import FieldInput from 'Molecules/FieldInput';
import Form from 'Atoms/Form/Form';

const InputLabelStyled = styled(InputLabel)`
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

interface CollectionFields {
  name: string;
  description: string;
}

type Props = {
  className?: string;
  refetch: () => Promise<Collection | Collection[]>;
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
      .then(() => refetch())
      .then(() => {
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
        <Form className={className}>
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Name
          </InputLabelStyled>
          <FieldInput name="name" placeholder="Name" />
          <FormError name="name" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Description
          </InputLabelStyled>
          <FieldInput name="description" placeholder="Description" />
          <FormError name="description" />
          <FormButton type="submit" fontWeight="light" disabled={isSubmitting}>
            Change collection info
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default CollectionEditForm;
