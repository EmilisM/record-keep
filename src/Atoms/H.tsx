import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'big' | 'veryBig';
const fontSizes: FontSizes<Sizes> = {
  big: {
    desktop: 60,
    tablet: 40,
    mobile: 20,
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
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => fontSizes[props.fontSize || 'big'].desktop}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};
  margin: 0;

  @media ${props => props.theme.responsive.tablet} {
    font-size: ${props => fontSizes[props.fontSize || 'big'].tablet}px;
  }

  @media ${props => props.theme.responsive.mobile} {
    font-size: ${props => fontSizes[props.fontSize || 'big'].mobile}px;
  }
`;

export default H;
