import React, { ReactElement, ReactNode, MouseEventHandler } from 'react';
import styled from 'styled-components/macro';
import Loader from 'Atoms/Loader/Loader';

const CardStyled = styled.div`
  background: ${props => props.theme.colors.background.primary};
  border-radius: 4px;

  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};
  font-family: ${props => props.theme.font.fontFamily.primary};
  position: relative;
`;

const CardLoaderOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};
  background-color: ${props => props.theme.colors.background.primaryLight};

  width: 100%;
  height: 100%;
`;

type Props = {
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const Card = ({ className, children, isLoading, onClick }: Props): ReactElement => (
  <CardStyled className={className} onClick={onClick}>
    {isLoading ? (
      <CardLoaderOverlay>
        <Loader />
      </CardLoaderOverlay>
    ) : (
      children
    )}
  </CardStyled>
);

export default Card;
