import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'medium';
const fontSizes: FontSizes<Sizes> = {
  medium: {
    desktop: 18,
    tablet: 18,
    mobile: 18,
  },
};

type Props = {
  className?: string;
  children: ReactNode;
  fontSize?: Sizes;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
};

const FormErrorBase = (props: Props): ReactElement => <div {...props} />;

const FormError = styled(FormErrorBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'medium'].desktop}px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.error};
  padding: 6px 10px;
  background-color: transparent;

  color: ${props => props.theme.colors.text.error};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].mobile}px;
  }
`;

export default FormError;
