import React, { ReactElement, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';
import RouteConfig from '../Routes/RouteConfig';

type StyledProps = {
  fontWeight?: '300' | '400' | '600';
  fontSize: number;
  color?: keyof DefaultTheme['colors']['text'];
};

const RouterLinkStyled = styled(RouterLink)<StyledProps>`
  color: ${props => (props.color ? props.theme.colors.text[props.color] : props.theme.colors.text.primaryLight)};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize};
`;

type Props = StyledProps & {
  children: ReactNode;
  className?: string;
  to: keyof typeof RouteConfig;
};

const Link = ({ children, className, to, color, fontWeight, fontSize }: Props): ReactElement => (
  <RouterLinkStyled
    to={RouteConfig[to]}
    className={className}
    color={color}
    fontWeight={fontWeight}
    fontSize={fontSize}
  >
    {children}
  </RouterLinkStyled>
);

export default Link;
