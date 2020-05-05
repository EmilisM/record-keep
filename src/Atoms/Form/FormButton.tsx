import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import styled from 'styled-components/macro';

const FormButton = styled(ButtonDashboard)`
  width: 300px;
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export default FormButton;
