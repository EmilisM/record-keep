import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

type StyledProps = {
  fontWeight?: '300' | '400' | '600';
  fontSize: number;
  color?: keyof DefaultTheme['colors']['text'];
};

type Props = {
  className?: string;
  level: '1' | '2' | '3' | '4' | '5' | '6';
  children: ReactNode;
};

const HeadingBase = ({ className, level, children }: Props): ReactElement => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  return <Heading className={className}>{children}</Heading>;
};

const HeadingStyled = styled(HeadingBase)<StyledProps>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize}px;
  color: ${props => (props.color ? props.theme.colors.text[props.color] : props.theme.colors.text.primaryLight)};
  margin: 0;
`;

export default HeadingStyled;
