import styled from 'styled-components/macro';

type Props = {
  className?: string;
  fontWeight?: '300' | '400' | '600';
  fontSize?: number;
};

const Anchor = styled.a<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight || '400'};
  font-size: ${props => props.fontSize || 16}px;
  margin: 0;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

export default Anchor;
