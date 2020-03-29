import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';

const InputDashboard = styled(Input)`
  border-radius: unset;
  border: solid ${props => props.theme.colors.border.cardShadow};
  border-width: 0 0 2px 0;

  padding: 0;
`;

export default InputDashboard;
