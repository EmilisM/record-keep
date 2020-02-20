import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'medium';
const FontSizes: FontSizes<Sizes> = {
  medium: {
    desktop: 16,
    tablet: 16,
    mobile: 16,
  },
};

type Props = {
  className?: string;
  onClick?(): void;
  children: ReactNode;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: number;
  color?: keyof DefaultTheme['colors']['text'];
};

const ButtonBase = ({ className, children, onClick }: Props): ReactElement => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

const Button = styled(ButtonBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};
`;

export default Button;
