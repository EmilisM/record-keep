import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'medium' | 'regular' | 'big' | 'veryBig';
const fontSizes: FontSizes<Sizes> = {
  medium: {
    desktop: 40,
    tablet: 30,
    mobile: 30,
  },
  regular: {
    desktop: 25,
    tablet: 22,
    mobile: 20,
  },
  big: {
    desktop: 60,
    tablet: 40,
    mobile: 25,
  },
  veryBig: {
    desktop: 80,
    tablet: 80,
    mobile: 50,
  },
};

type StyledProps = Props & {
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize: Sizes;
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
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'big'].desktop}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};
  margin: 0;

  @media ((min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props =>
  props.theme.breakpoints.desktop})) {
    font-size: ${props => fontSizes[props.fontSize || 'big'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'big'].mobile}px;
  }
`;

export default H;
