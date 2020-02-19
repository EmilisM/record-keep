import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

type StyledProps = Props & {
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: number;
  color?: keyof DefaultTheme['colors']['text'];
};

type Props = {
  className?: string;
  children: ReactNode;
  href: string;
  target?: string;
};

const ABase = ({ className, children, target, href }: Props): ReactElement => (
  <a className={className} href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : ''}>
    {children}
  </a>
);

const A = styled(ABase)<StyledProps>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => (props.color ? props.theme.colors.text[props.color] : props.theme.colors.text.primaryLight)};
  margin: 0;
  text-decoration: none;
  outline: none;

  transition: 200ms opacity ease;

  &:hover,
  &:focus {
    opacity: 0.7;
  }
`;

export default A;
