import React, { ReactElement } from 'react';
import Modal from 'Atoms/Modal';
import styled from 'styled-components/macro';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';

const ButtonDashboardStyled = styled(ButtonDashboard)`
  width: 150px;
  justify-content: center;

  &:first-child {
    margin-right: 10px;
  }
`;

const Content = styled.div`
  display: flex;

  padding: 20px 0 0;
`;

type Props = {
  className?: string;
  isLoading?: boolean;
  isOpen: boolean;
  title: string;
  onRequestClose: () => void;
  onConfirm: () => void;
};

const DeletionModal = ({ className, isLoading, isOpen, title, onRequestClose, onConfirm }: Props): ReactElement => (
  <Modal className={className} isOpen={isOpen} onRequestClose={onRequestClose} title={title} isLoading={isLoading}>
    <Content>
      <ButtonDashboardStyled onClick={onConfirm}>Yes</ButtonDashboardStyled>
      <ButtonDashboardStyled>No</ButtonDashboardStyled>
    </Content>
  </Modal>
);

export default DeletionModal;
