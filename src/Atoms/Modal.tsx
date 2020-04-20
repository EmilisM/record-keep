import React, { ReactElement, ReactNode } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import { ReactComponent as Close } from 'Assets/Close.svg';
import InvisibleButton from './Button/InvisibleButton';

const ModalStyled = styled(ReactModal)`
  position: absolute;

  top: 20%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -20%);
  overflow: auto;

  width: 70%;
  max-height: 90%;

  background: ${props => props.theme.colors.background.primary};
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};
  padding: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseIcon = styled(Close)`
  fill: ${props => props.theme.colors.text.primaryDarker};

  height: 30px;
  width: 30px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    height: 25px;
    width: 25px;
  }
`;

const InvisibleButtonStyled = styled(InvisibleButton)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  className?: string;
  children: ReactNode;
  onRequestClose: () => void;
  isOpen: boolean;
  title: string;
};

const Modal = ({ className, children, onRequestClose, isOpen, title }: Props): ReactElement => (
  <ModalStyled className={className} onRequestClose={onRequestClose} isOpen={isOpen} closeTimeoutMS={200}>
    <HeaderContainer>
      <H level="2" color="primaryDarker" fontSize="big" fontWeight="semiBold">
        {title}
      </H>
      <InvisibleButtonStyled onClick={() => onRequestClose()}>
        <CloseIcon />
      </InvisibleButtonStyled>
    </HeaderContainer>
    {children}
  </ModalStyled>
);

export default Modal;
