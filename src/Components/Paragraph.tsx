import styled from 'styled-components/macro';

type Props = {
  className?: string;
  fontWeight?: '300' | '400' | '600';
  fontSize?: number;
};

const Paragraph = styled.p<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize || 16}px;
  margin: 0;
`;

export default Paragraph;
