import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import ImageForm from 'Molecules/Form/ImageForm';
import { ImageCreateModel } from 'Types/Image';

type Props = {
  className?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
  onImageSubmit: (data: ImageCreateModel) => Promise<void>;
};

const EditCollectionModal = ({ className, isOpen, isLoading, onRequestClose, onImageSubmit }: Props): ReactElement => (
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
  </Modal>
);

export default EditCollectionModal;
