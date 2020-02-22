import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { NavLink as NavLinkRouter } from 'react-router-dom';

import RouteConfig from 'Routes/RouteConfig';

type Props = {
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: number;
  color?: keyof DefaultTheme['colors']['text'];
  hoverColor?: keyof DefaultTheme['colors']['text'];
  children: ReactNode;
  className?: string;
  to: keyof typeof RouteConfig;
  activeClassName?: string;
  onClick?(): void;
};

const NavLinkBase = ({
  children,
  className,
  to,
  activeClassName = 'nav-link-active',
  onClick,
}: Props): ReactElement => (
  <NavLinkRouter className={className} to={RouteConfig[to]} activeClassName={activeClassName} onClick={onClick}>
    {children}
  </NavLinkRouter>
);

const NavLink = styled(NavLinkBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLighter']};
  text-decoration: none;
  outline: none;

  transition: 200ms opacity ease, 200ms color ease;

  &:active,
  &:hover,
  &.${props => props.activeClassName} {
    color: ${props => props.theme.colors.text[props.hoverColor || 'primaryLight']};
  }
`;

export default NavLink;
