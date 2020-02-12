import styled, { DefaultTheme } from 'styled-components/macro';

type Props = {
  className?: string;
  fontWeight?: '300' | '400' | '600';
  fontSize?: number;
  color?: keyof DefaultTheme['colors']['text'];
  opacity?: number;
};

const Paragraph = styled.p<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => (props.color ? props.theme.colors.text[props.color] : props.theme.colors.text.primaryLight)};
  opacity: ${props => props.opacity || 1};
  margin: 0;
`;

export default Paragraph;
