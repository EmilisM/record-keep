import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { NavLink as NavLinkRouter, useLocation } from 'react-router-dom';

import { RouteConfig, RouteType } from 'Routes/RouteConfig';
import { FontSizes } from 'Types/Style';

type Sizes = 'medium';
const fontSizes: FontSizes<Sizes> = {
  medium: {
    desktop: 22,
    tablet: 22,
    mobile: 22,
  },
};

type Props = {
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: Sizes;
  color?: keyof DefaultTheme['colors']['text'];
  hoverColor?: keyof DefaultTheme['colors']['text'];
  className?: string;
  activeClassName?: string;
  onClick?(): void;
  children: ReactNode;
  to: RouteType;
};

const NavLinkBase = ({
  children,
  className,
  to,
  activeClassName = 'nav-link-active',
  onClick,
}: Props): ReactElement => {
  const location = useLocation();

  return (
    <NavLinkRouter
      className={className}
      to={{
        pathname: RouteConfig[to],
        state: {
          from: location.pathname,
        },
      }}
      activeClassName={activeClassName}
      onClick={onClick}
    >
      {children}
    </NavLinkRouter>
  );
};

const NavLink = styled(NavLinkBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'medium'].desktop}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLighter']};
  text-decoration: none;
  outline: none;

  transition: all 200ms ease;

  &:active,
  &:hover,
  &.${props => props.activeClassName} {
    color: ${props => props.theme.colors.text[props.hoverColor || 'primaryLight']};
  }

  @media ((min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props =>
  props.theme.breakpoints.desktop})) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].mobile}px;
  }
`;

export default NavLink;
