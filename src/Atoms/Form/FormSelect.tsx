import Select from 'Molecules/Select/Select';
import styled from 'styled-components/macro';

const FormSelect = styled(Select)`
  width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  border: 1px solid ${props => props.theme.colors.text.primaryDarker};
  border-radius: 4px;
  margin-top: 10px;
`;

export default FormSelect;
