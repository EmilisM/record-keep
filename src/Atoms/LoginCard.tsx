import styled from 'styled-components/macro';

const LoginCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: 8px;
  padding: 20px;

  width: 100%;
  max-width: 400px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export default LoginCard;
