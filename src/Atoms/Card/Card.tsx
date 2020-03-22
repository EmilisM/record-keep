import styled from 'styled-components/macro';

const Card = styled.div`
  background: ${props => props.theme.colors.background.primary};
  border-radius: 4px;
  padding: 20px;

  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};
  font-family: ${props => props.theme.font.fontFamily.primary};
`;

export default Card;
