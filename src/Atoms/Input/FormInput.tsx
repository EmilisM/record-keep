import React, { ReactElement } from 'react';
import { useField } from 'formik';
import Input, { Props as InputProps } from './Input';
import styled from 'styled-components/macro';

const InputStyled = styled(Input)`
  border: 1px solid ${props => props.theme.colors.text.primaryDarker};
  width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

type Props = InputProps & {
  label?: string;
};

const FormInput = ({ fontSize, fontWeight, ...rest }: Props): ReactElement => {
  const [field] = useField(rest);

  return <InputStyled {...field} {...rest} fontSize={fontSize} fontWeight={fontWeight} color="primaryDarker" />;
};

export default FormInput;
