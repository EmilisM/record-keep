import React, { ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
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
  onClick?: () => void;
  children: ReactNode;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: Sizes;
  color?: keyof DefaultTheme['colors']['text'];
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

const ButtonBase = ({ className, children, onClick, type }: Props): ReactElement => (
  <button onClick={onClick} className={className} type={type}>
    {children}
  </button>
);

const Button = styled(ButtonBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'medium'].desktop}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryDark']};
  background-color: ${props => props.theme.colors.background.primary};
  outline: none;

  border: 1px solid ${props => props.theme.colors.border.primary};

  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;

  @media ((min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props =>
  props.theme.breakpoints.desktop})) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].tablet};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].mobile};
  }
`;

export default Button;
