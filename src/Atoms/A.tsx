import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

type StyledProps = {
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: number;
  color?: keyof DefaultTheme['colors']['text'];
};

const AStyled = styled.a<StyledProps>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => (props.color ? props.theme.colors.text[props.color] : props.theme.colors.text.primaryLight)};
  margin: 0;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

type Props = StyledProps & {
  className?: string;
  children: ReactNode;
  href: string;
  target?: string;
};

const A = ({ className, children, target, href, color, fontWeight, fontSize }: Props): ReactElement => (
  <AStyled
    className={className}
    href={href}
    target={target}
    rel={target === '_blank' ? 'noopener noreferrer' : ''}
    color={color}
    fontWeight={fontWeight}
    fontSize={fontSize}
  >
    {children}
  </AStyled>
);

export default A;
