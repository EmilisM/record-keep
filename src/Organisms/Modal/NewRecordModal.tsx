import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import NewRecordForm from 'Organisms/Form/NewRecordForm';
import { Record } from 'Types/Record';
import { ReactComponent as RecordIcon } from 'Assets/Records.svg';

type Props = {
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
  collectionId: number;
  recordsRefetch: () => Promise<Record[]>;
};

const NewRecordModal = ({ className, isOpen, onRequestClose, collectionId, recordsRefetch }: Props): ReactElement => (
  <Modal
    Icon={RecordIcon}
    className={className}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    title="Create a new record"
  >
    <NewRecordForm collectionId={collectionId} recordsRefetch={recordsRefetch} onRequestClose={onRequestClose} />
  </Modal>
);

export default NewRecordModal;
