import React, { ReactElement, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

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
};

const LinkBase = ({ children, className, to }: Props): ReactElement => (
  <RouterLink to={RouteConfig[to]} className={className}>
    {children}
  </RouterLink>
);

const Link = styled(LinkBase)<StyledProps>`
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
`;

export default Link;
