import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

type StyledProps = {
  backgroundColor?: keyof DefaultTheme['colors']['background'];
};

type Props = {
  className?: string;
  children?: ReactNode;
  onClick?(): void;
};

const CardBase = ({ className, children, onClick }: Props): ReactElement => (
  <div className={className} onClick={onClick}>
    {children}
  </div>
);

const Card = styled(CardBase)<StyledProps>`
  background-color: ${props =>
    props.backgroundColor ? props.theme.colors.background[props.backgroundColor] : 'transparent'};
  border-radius: 6px;
  border: none;
`;

export default Card;
