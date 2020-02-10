import styled from 'styled-components/macro';

const HeadingFirst = styled.h1`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight.semiBold};
  font-size: 80px;
`;

export default HeadingFirst;
