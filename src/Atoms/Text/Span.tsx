import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'regular' | 'medium';
const fontSizes: FontSizes<Sizes> = {
  regular: {
    desktop: 20,
    tablet: 18,
    mobile: 16,
  },
  medium: {
    desktop: 22,
    tablet: 20,
    mobile: 18,
  },
};

type Props = {
  className?: string;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: Sizes;
  color?: keyof DefaultTheme['colors']['text'];
};

const Span = styled.span<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'medium'].desktop}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};

  @media ((min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props =>
  props.theme.breakpoints.desktop})) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].mobile}px;
  }
`;

export default Span;
