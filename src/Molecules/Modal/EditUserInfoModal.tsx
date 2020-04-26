import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import styled from 'styled-components/macro';
import ChangePasswordForm from 'Molecules/Form/ChangePasswordForm';
import EditUserInfoForm from 'Molecules/Form/EditUserInfoForm';
import UserImageForm from 'Molecules/Form/UserImageForm';

const FormSeparator = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.text.primaryDarker};
  height: 1px;
`;

type Props = {
  className?: string;
  isLoading?: boolean;
  displayName?: string | null;
  profileImageId?: string;
  isOpen: boolean;
  onRequestClose: () => void;
  userInfoRefetch: () => void;
};

const EditUserInfoModal = ({
  className,
  isOpen,
  onRequestClose,
  isLoading,
  displayName,
  userInfoRefetch,
  profileImageId,
}: Props): ReactElement => (
  <Modal
    className={className}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    title="Edit user info"
    isLoading={isLoading}
  >
    <UserImageForm profileImageId={profileImageId} userInfoRefetch={userInfoRefetch} />
    <EditUserInfoForm displayName={displayName} userInfoRefetch={userInfoRefetch} />
    <FormSeparator />
    <ChangePasswordForm />
  </Modal>
);

export default EditUserInfoModal;
