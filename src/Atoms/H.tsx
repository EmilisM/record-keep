import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

type StyledProps = Props & {
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize: number;
  color?: keyof DefaultTheme['colors']['text'];
};

type Props = {
  className?: string;
  level: '1' | '2' | '3' | '4' | '5' | '6';
  children: ReactNode;
};

const HStyled = ({ className, level, children }: Props): ReactElement => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  return <Heading className={className}>{children}</Heading>;
};

const H = styled(HStyled)<StyledProps>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};
  margin: 0;
`;

export default H;
