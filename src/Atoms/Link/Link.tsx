import React, { ReactElement, ReactNode, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'normal';
const fontSizes: FontSizes<Sizes> = {
  normal: {
    desktop: 20,
    tablet: 18,
    mobile: 16,
  },
};

type Props = {
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: Sizes;
  color?: keyof DefaultTheme['colors']['text'];
  className?: string;
  id?: string;
  children: ReactNode;
  to: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const LinkBase = ({ children, className, to, id, onClick }: Props): ReactElement => (
  <RouterLink id={id} to={to} className={className} onClick={onClick}>
    {children}
  </RouterLink>
);

const Link = styled(LinkBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  color: ${props => (props.color ? props.theme.colors.text[props.color] : props.theme.colors.text.primaryLight)};
  font-size: ${props => fontSizes[props.fontSize || 'normal'].desktop}px;
  text-decoration: none;
  outline: none;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: ${props => fontSizes[props.fontSize || 'normal'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'normal'].mobile}px;
  }

  transition: all 300ms ease;
`;

export default Link;
