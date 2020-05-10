import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'medium';
const fontSizes: FontSizes<Sizes> = {
  medium: {
    desktop: 20,
    tablet: 20,
    mobile: 20,
  },
};

type Props = {
  className?: string;
  name?: string;
  children?: ReactNode;
  onClick?: () => void;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: Sizes;
  color?: keyof DefaultTheme['colors']['text'];
  type?: 'button' | 'submit' | 'reset';
};

const Button = styled.button<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'medium'].desktop}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryDark']};
  cursor: pointer;
  border: unset;
  background: inherit;
  padding: 0;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].tablet};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].mobile};
  }
`;

const InvisibleButton = ({
  className,
  name,
  onClick,
  children,
  type,
  color,
  fontWeight,
  fontSize,
}: Props): ReactElement => (
  <Button
    className={className}
    onClick={onClick}
    name={name}
    type={type || 'button'}
    color={color}
    fontWeight={fontWeight}
    fontSize={fontSize}
  >
    {children}
  </Button>
);

export default InvisibleButton;
