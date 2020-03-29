import React, { ReactElement, ReactNode, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

type Props = {
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: number;
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
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => (props.color ? props.theme.colors.text[props.color] : props.theme.colors.text.primaryLight)};
  text-decoration: none;
  outline: none;

  transition: 200ms opacity ease;

  &:hover,
  &:focus {
    opacity: 0.7;
  }
`;

export default Link;
