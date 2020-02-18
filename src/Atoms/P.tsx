import styled, { DefaultTheme } from 'styled-components/macro';

type Props = {
  className?: string;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: number;
  color?: keyof DefaultTheme['colors']['text'];
  opacity?: number;
};

const P = styled.p<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};
  opacity: ${props => props.opacity || 1};
  margin: 0;
`;

export default P;
