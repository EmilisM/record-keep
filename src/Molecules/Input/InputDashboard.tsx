import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';

const InputDashboard = styled(Input)`
  border-radius: 4px;
  border: solid 2px ${props => props.theme.colors.border.cardShadow};
`;

export default InputDashboard;
