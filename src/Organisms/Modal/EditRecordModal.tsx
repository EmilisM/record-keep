import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import ImageForm from 'Organisms/Form/ImageForm';
import EditRecordForm from 'Organisms/Form/EditRecordForm';
import FormSeparator from 'Atoms/Form/FormSeparator';
import styled from 'styled-components/macro';
import { Record } from 'Types/Record';
import { ImageFormFields } from 'Types/Image';
import { FormikHelpers } from 'formik';

type Props = {
  className?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
  onImageSubmit: (values: ImageFormFields, helpers: FormikHelpers<ImageFormFields>) => void;
  title: string;
  recordsRefetch: () => Promise<Record[]>;
  record: Record;
};

const ModalStyled = styled(Modal)`
  overflow: unset;
`;

const EditRecordModal = ({
  className,
  isOpen,
  isLoading,
  onRequestClose,
  onImageSubmit,
  title,
  recordsRefetch,
  record,
}: Props): ReactElement => (
  <ModalStyled
    className={className}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    isLoading={isLoading}
    title={title}
  >
    <ImageForm
      onSubmit={onImageSubmit}
      title="Change record image"
      inputLabel="Choose an image"
      buttonLabel="Change record image"
    />
    <FormSeparator />
    <EditRecordForm recordsRefetch={recordsRefetch} record={record} />
  </ModalStyled>
);

export default EditRecordModal;
