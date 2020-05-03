import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import ImageForm from 'Organisms/Form/ImageForm';
import { ImageCreateModel } from 'Types/Image';

type Props = {
  className?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
  onImageSubmit: (data: ImageCreateModel) => Promise<void>;
  title: string;
};

const EditRecordModal = ({
  className,
  isOpen,
  isLoading,
  onRequestClose,
  onImageSubmit,
  title,
}: Props): ReactElement => (
  <Modal className={className} isOpen={isOpen} onRequestClose={onRequestClose} isLoading={isLoading} title={title}>
    <ImageForm
      onSubmit={onImageSubmit}
      title="Change record image"
      inputLabel="Choose an image"
      buttonLabel="Change record image"
    />
  </Modal>
);

export default EditRecordModal;
