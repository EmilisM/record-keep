import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import styled from 'styled-components/macro';

type Props = {
  className?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
};

const DeletionModal = ({ className, isOpen, isLoading, onRequestClose }: Props): ReactElement => (
  <Modal
    className={className}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    title="Edit collection"
    isLoading={isLoading}
  >
    Are you sure ?
  </Modal>
);

export default DeletionModal;
