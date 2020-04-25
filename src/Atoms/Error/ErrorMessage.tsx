import React, { ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'normal';
const fontSizes: FontSizes<Sizes> = {
  normal: {
    desktop: 19,
    tablet: 17,
    mobile: 15,
  },
};

export type Props = {
  className?: string;
  children: ReactNode;
  fontSize?: Sizes;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
};

const ErrorMessageBase = (props: Props): ReactElement => <div {...props} />;

const ErrorMessage = styled(ErrorMessageBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'normal'].desktop}px;
  background-color: transparent;

  color: ${props => props.theme.colors.text.error};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: ${props => fontSizes[props.fontSize || 'normal'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'normal'].mobile}px;
  }
`;

export default ErrorMessage;
