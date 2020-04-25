import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'normal';
const fontSizes: FontSizes<Sizes> = {
  normal: {
    desktop: 20,
    tablet: 18,
    mobile: 16,
  },
};

type Props = {
  className?: string;
  children?: ReactNode;
  htmlFor?: string;
  fontSize?: Sizes;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  color?: keyof DefaultTheme['colors']['text'];
};

const InputLabelBase = ({ className, children, htmlFor }: Props): ReactElement => (
  <label className={className} htmlFor={htmlFor}>
    {children}
  </label>
);

const InputLabel = styled(InputLabelBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'normal'].desktop}px;
  background-color: transparent;

  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};

  @media ((min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props =>
  props.theme.breakpoints.desktop})) {
    font-size: ${props => fontSizes[props.fontSize || 'normal'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'normal'].mobile}px;
  }
`;

export default InputLabel;
