import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import ImageForm from 'Molecules/Form/ImageForm';
import { ImageCreateModel } from 'Types/Image';
import CollectionEditForm from 'Molecules/Form/CollectionEditForm';
import { Collection } from 'Types/Collection';

type Props = {
  className?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
  onImageSubmit: (data: ImageCreateModel) => Promise<void>;
  collectionsRefetch: () => void;
  activeCollection: Collection;
};

const EditCollectionModal = ({
  className,
  isOpen,
  isLoading,
  onRequestClose,
  onImageSubmit,
  activeCollection,
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
    <CollectionEditForm
      name={activeCollection.name}
      description={activeCollection.description}
      id={activeCollection.id}
      collectionsRefetch={collectionsRefetch}
    />
  </Modal>
);

export default EditCollectionModal;
