import styled from 'styled-components/macro';

const Card = styled.div`
  background-color: ${props => props.theme.colors.background.primary};
  border-radius: 4px;
  border: none;
  width: 100%;
  height: 100%;
`;

export default Card;
