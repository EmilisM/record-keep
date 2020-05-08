import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import ImageForm from 'Organisms/Form/ImageForm';
import CollectionEditForm from 'Organisms/Form/CollectionEditForm';
import { Collection } from 'Types/Collection';
import FormSeparator from 'Atoms/Form/FormSeparator';
import { FormikHelpers } from 'formik';
import { ImageFormFields, getImageCreateRequest, ImageResponse } from 'Types/Image';
import { updateCollection } from 'API/Collection';
import { updateImage, createImage } from 'API/Image';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { ReactComponent as CollectionIcon } from 'Assets/Collections.svg';

type Props = {
  className?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
  refetch: () => Promise<Collection[] | Collection>;
  collection: Collection;
};

const EditCollectionModal = ({
  className,
  isOpen,
  isLoading,
  onRequestClose,
  refetch,
  collection,
}: Props): ReactElement => {
  const [mutateUpdateImage] = useMutation(updateImage);
  const [mutateCreateImage] = useMutation(createImage);
  const [mutateCollection] = useMutation(updateCollection);

  const onImageSubmit = (values: ImageFormFields, helpers: FormikHelpers<ImageFormFields>): void => {
    if (!collection || !values.image) {
      helpers.setSubmitting(false);
      return;
    }

    const imageRequest = getImageCreateRequest(values.crop, values.image);

    new Promise<ImageResponse | null>(resolve => {
      if (collection?.image?.id) {
        mutateUpdateImage({ ...imageRequest, id: collection.image.id }).then(() => resolve(null));
      } else {
        mutateCreateImage(imageRequest).then(image => resolve(image));
      }
    })
      .then(image =>
        image
          ? mutateCollection({
              id: collection.id,
              operations: [{ op: 'add', path: '/imageId', value: image.id }],
            })
          : null,
      )
      .then(() => refetch())
      .then(() => {
        helpers.setSubmitting(false);
        helpers.resetForm();
        toast.success('Collection image update complete');
      });
  };

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="Edit collection"
      isLoading={isLoading}
      Icon={CollectionIcon}
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
};

export default EditCollectionModal;
