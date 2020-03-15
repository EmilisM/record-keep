import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'small' | 'medium' | 'big';
const fontSizes: FontSizes<Sizes> = {
  small: {
    desktop: 16,
    tablet: 16,
    mobile: 16,
  },
  medium: {
    desktop: 22,
    tablet: 21,
    mobile: 20,
  },
  big: {
    desktop: 40,
    tablet: 35,
    mobile: 30,
  },
};

type Props = {
  className?: string;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: Sizes;
  color?: keyof DefaultTheme['colors']['text'];
  opacity?: number;
};

const P = styled.p<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'medium'].desktop}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};
  opacity: ${props => props.opacity || 1};
  margin: 0;

  @media ${props => props.theme.responsive.tablet} {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].tablet}px;
  }

  @media ${props => props.theme.responsive.mobile} {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].mobile}px;
  }
`;

export default P;
