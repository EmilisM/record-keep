import React, { ReactElement, ReactNode, FC } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import { ReactComponent as Close } from 'Assets/Close.svg';
import InvisibleButton from './Button/InvisibleButton';
import { PageLoader } from './Loader/PageLoader';

const ModalStyled = styled(ReactModal)`
  width: 80%;
  margin: 80px 0 20px 0;

  background: ${props => props.theme.colors.background.primary};
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};
  padding: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    margin: 0;
    overflow-y: auto;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    width: 30px;
    height: 30px;

    margin-right: 10px;
  }
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

  margin-left: auto;
`;

type Props = {
  className?: string;
  isLoading?: boolean;
  Icon?: FC;
  children: ReactNode;
  onRequestClose: () => void;
  isOpen: boolean;
  title: string;
};

const Modal = ({ className, children, onRequestClose, isOpen, title, isLoading, Icon }: Props): ReactElement => (
  <ModalStyled className={className} onRequestClose={onRequestClose} isOpen={isOpen} closeTimeoutMS={200}>
    <PageLoader isLoading={isLoading} />
    <HeaderContainer>
      {Icon && <Icon />}
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
