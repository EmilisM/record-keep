import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import ImageForm from 'Organisms/Form/ImageForm';
import CollectionEditForm from 'Organisms/Form/CollectionEditForm';
import { Collection } from 'Types/Collection';
import FormSeparator from 'Atoms/Form/FormSeparator';
import { ImageFormFields } from 'Types/Image';
import { FormikHelpers } from 'formik';

type Props = {
  className?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
  onImageSubmit: (values: ImageFormFields, helpers: FormikHelpers<ImageFormFields>) => void;
  refetch: () => Promise<Collection[] | Collection>;
  collection: Collection;
};

const EditCollectionModal = ({
  className,
  isOpen,
  isLoading,
  onRequestClose,
  onImageSubmit,
  refetch,
  collection,
}: Props): ReactElement => (
  <Modal
    className={className}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    title="Edit collection"
    isLoading={isLoading}
  >
    <ImageForm
      onSubmit={onImageSubmit}
      title="Change collection image"
      inputLabel="Choose an image"
      buttonLabel="Change collection image"
    />
    <FormSeparator />
    <CollectionEditForm collection={collection} refetch={refetch} />
  </Modal>
);

export default EditCollectionModal;
