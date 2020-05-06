import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import ImageForm from 'Organisms/Form/ImageForm';
import EditRecordForm from 'Organisms/Form/EditRecordForm';
import FormSeparator from 'Atoms/Form/FormSeparator';
import { Record } from 'Types/Record';
import { ImageFormFields, getImageCreateRequest, ImageResponse } from 'Types/Image';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { updateRecord as updateRecordAPI } from 'API/Record';
import { updateImage as updateImageAPI, createImage as createImageAPI } from 'API/Image';

type Props = {
  className?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  recordsRefetch: () => Promise<Record[] | Record>;
  record: Record;
};

const EditRecordModal = ({
  className,
  isOpen,
  isLoading,
  onRequestClose,
  title,
  recordsRefetch,
  record,
}: Props): ReactElement => {
  const [updateRecord] = useMutation(updateRecordAPI);
  const [updateImage] = useMutation(updateImageAPI);
  const [createImage] = useMutation(createImageAPI);

  const onImageSubmit = (values: ImageFormFields, helpers: FormikHelpers<ImageFormFields>): void => {
    if (!record || !values.image) {
      helpers.setSubmitting(false);
      return;
    }

    const imageReq = getImageCreateRequest(values.crop, values.image);

    new Promise<ImageResponse | null>(resolve => {
      if (record.image) {
        updateImage({ id: record.image.id, ...imageReq }).then(() => resolve(null));
      } else {
        createImage(imageReq).then(resolve);
      }
    })
      .then(image =>
        image ? updateRecord({ id: record.id, operations: [{ op: 'add', path: '/imageId', value: image.id }] }) : null,
      )
      .then(() => recordsRefetch())
      .then(() => {
        helpers.setSubmitting(false);
        helpers.resetForm();
        toast.success('Record image update complete');
      });
  };

  return (
    <Modal className={className} isOpen={isOpen} onRequestClose={onRequestClose} isLoading={isLoading} title={title}>
      <ImageForm
        onSubmit={onImageSubmit}
        title="Change record image"
        inputLabel="Choose an image"
        buttonLabel="Change record image"
      />
      <FormSeparator />
      <EditRecordForm recordsRefetch={recordsRefetch} record={record} />
    </Modal>
  );
};

export default EditRecordModal;
