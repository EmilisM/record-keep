import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'normal' | 'regular' | 'big' | 'dashboardTitle' | 'landingSubTitle' | 'landingTitle';
const fontSizes: FontSizes<Sizes> = {
  normal: {
    desktop: 20,
    tablet: 18,
    mobile: 16,
  },
  regular: {
    desktop: 22,
    tablet: 20,
    mobile: 18,
  },
  big: {
    desktop: 26,
    tablet: 24,
    mobile: 22,
  },
  dashboardTitle: {
    desktop: 40,
    tablet: 30,
    mobile: 30,
  },
  landingSubTitle: {
    desktop: 60,
    tablet: 40,
    mobile: 25,
  },
  landingTitle: {
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
