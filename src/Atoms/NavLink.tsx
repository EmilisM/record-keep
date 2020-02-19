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
};

const NavLinkBase = ({ children, className, to, activeClassName = 'nav-link-active' }: Props): ReactElement => (
  <NavLinkRouter className={className} to={to} activeClassName={activeClassName}>
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

  &:hover,
  &:focus {
    opacity: 0.7;
  }

  &.${props => props.activeClassName || 'nav-link-active'} {
    opacity: 0.7;
  }
`;

export default NavLink;
