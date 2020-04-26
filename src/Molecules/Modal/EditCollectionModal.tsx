import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import ImageForm from 'Molecules/Form/ImageForm';
import { ImageCreateModel } from 'Types/Image';
import CollectionEditForm from 'Molecules/Form/CollectionEditForm';

type Props = {
  className?: string;
  isLoading?: boolean;
  description: string | null;
  name: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onImageSubmit: (data: ImageCreateModel) => Promise<void>;
  id: number;
  collectionsRefetch: () => void;
};

const EditCollectionModal = ({
  className,
  isOpen,
  isLoading,
  onRequestClose,
  onImageSubmit,
  name,
  description,
  id,
  collectionsRefetch,
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
    <CollectionEditForm name={name} description={description} id={id} collectionsRefetch={collectionsRefetch} />
  </Modal>
);

export default EditCollectionModal;
