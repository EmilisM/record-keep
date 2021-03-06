import React, { ReactElement } from 'react';
import { useField } from 'formik';
import Input, { Props as InputProps } from 'Atoms/Input/Input';
import styled from 'styled-components/macro';

const InputStyled = styled(Input)`
  border: 1px solid ${props => props.theme.colors.text.primaryDarker};
  width: 300px;
  margin-top: 10px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const FormInput = ({ fontSize, fontWeight, ...rest }: InputProps): ReactElement => {
  const [field] = useField(rest);

  return (
    <InputStyled
      {...field}
      value={field.value || ''}
      {...rest}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color="primaryDarker"
    />
  );
};

export default FormInput;
