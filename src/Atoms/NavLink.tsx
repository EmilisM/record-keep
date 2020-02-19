import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { NavLink as NavLinkRouter } from 'react-router-dom';

import RouteConfig from 'Routes/RouteConfig';

type StyledProps = Props & {
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: number;
  color?: keyof DefaultTheme['colors']['text'];
};

type Props = {
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

const NavLink = styled(NavLinkBase)<StyledProps>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => (props.color ? props.theme.colors.text[props.color] : props.theme.colors.text.primaryLight)};
  text-decoration: none;
  outline: none;

  transition: 200ms opacity ease;

  &.${props => props.activeClassName || 'nav-link-active'} {
    opacity: 0.6;
  }
`;

export default NavLink;
