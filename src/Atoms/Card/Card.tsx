import React, { ReactElement, ReactNode, MouseEventHandler } from 'react';
import styled from 'styled-components/macro';
import Loader from 'Atoms/Loader/Loader';

const CardStyled = styled.div`
  background: ${props => props.theme.colors.background.primary};
  border-radius: 4px;
  padding: 20px;

  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};
  font-family: ${props => props.theme.font.fontFamily.primary};
  position: relative;
`;

const CardLoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

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
    {children}
    {isLoading && (
      <CardLoaderOverlay>
        <Loader />
      </CardLoaderOverlay>
    )}
  </CardStyled>
);

export default Card;
