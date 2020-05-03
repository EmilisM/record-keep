import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import ChangePasswordForm from 'Organisms/Form/ChangePasswordForm';
import EditUserInfoForm from 'Organisms/Form/EditUserInfoForm';
import ImageForm from 'Organisms/Form/ImageForm';
import { ImageCreateModel } from 'Types/Image';
import FormSeparator from 'Atoms/Form/FormSeparator';

type Props = {
  className?: string;
  isLoading?: boolean;
  displayName?: string | null;
  isOpen: boolean;
  onRequestClose: () => void;
  userInfoRefetch: () => void;
  onSubmitImage: (data: ImageCreateModel) => Promise<void>;
};

const EditUserInfoModal = ({
  className,
  isOpen,
  onRequestClose,
  isLoading,
  displayName,
  userInfoRefetch,
  onSubmitImage,
}: Props): ReactElement => (
  <Modal
    className={className}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    title="Edit user info"
    isLoading={isLoading}
  >
    <ImageForm
      onSubmit={onSubmitImage}
      title="Profile image"
      inputLabel="Choose an image"
      buttonLabel="Change profile image"
    />
    <EditUserInfoForm displayName={displayName} userInfoRefetch={userInfoRefetch} />
    <FormSeparator />
    <ChangePasswordForm />
  </Modal>
);

export default EditUserInfoModal;
