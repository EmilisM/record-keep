import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import NewRecordForm from 'Organisms/Form/NewRecordForm';
import styled from 'styled-components/macro';

type Props = {
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
  collectionId: number;
  recordsRefetch: () => void;
};

const ModalStyled = styled(Modal)`
  overflow: unset;
`;

const NewRecordModal = ({ className, isOpen, onRequestClose, collectionId, recordsRefetch }: Props): ReactElement => (
  <ModalStyled className={className} isOpen={isOpen} onRequestClose={onRequestClose} title="Create a new record">
    <NewRecordForm collectionId={collectionId} recordsRefetch={recordsRefetch} onRequestClose={onRequestClose} />
  </ModalStyled>
);

export default NewRecordModal;
