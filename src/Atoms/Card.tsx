import styled from 'styled-components/macro';

const Card = styled.div`
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.background.primary},
    ${props => props.theme.colors.background.primaryDarker}
  );
  border-radius: 6px;
  padding: 20px;

  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};
`;

export default Card;
