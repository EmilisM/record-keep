import React, { ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'medium';
const fontSizes: FontSizes<Sizes> = {
  medium: {
    desktop: 20,
    tablet: 19,
    mobile: 18,
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
  disabled?: boolean;
};

const ButtonBase = ({ className, children, onClick, type, disabled }: Props): ReactElement => (
  <button onClick={onClick} className={className} type={type} disabled={disabled}>
    {children}
  </button>
);

const ButtonDashboard = styled(ButtonBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'medium'].desktop}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};
  background-color: ${props => props.theme.colors.background.secondaryDark};
  outline: none;
  border: none;

  display: flex;
  justify-content: flex-start;

  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;

  @media ((min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props =>
  props.theme.breakpoints.desktop})) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].mobile}px;
  }
`;

export default ButtonDashboard;
