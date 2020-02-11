import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/macro';

type StyledProps = {
  fontWeight?: '300' | '400' | '600';
  fontSize?: number;
};

const AnchorStyled = styled.a<StyledProps>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize || 16}px;
  margin: 0;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

type Props = {
  className?: string;
  children: ReactNode;
  href: string;
  target: string;
};

const Anchor = ({ className, children, target, href }: Props): ReactElement => (
  <AnchorStyled
    className={className}
    href={href}
    target={target}
    rel={target === '_blank' ? 'noopener noreferrer' : ''}
  >
    {children}
  </AnchorStyled>
);

export default Anchor;
