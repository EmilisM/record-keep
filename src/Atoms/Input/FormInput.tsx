import React, { ReactElement } from 'react';
import { useField } from 'formik';
import Input, { Props as InputProps } from './Input';
import FormError from 'Atoms/Error/FormError';
import styled from 'styled-components/macro';
import InputLabel from './InputLabel';

const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const InputLabelStyled = styled(InputLabel)`
  margin-bottom: 5px;
`;

const InputStyled = styled(Input)`
  border: 1px solid ${props => props.theme.colors.text.primaryDarker};
`;

const FormErrorStyled = styled(FormError)`
  margin-top: 5px;
`;

type Props = InputProps & {
  label?: string;
};

const FormInput = ({ fontSize, fontWeight, label, className, ...rest }: Props): ReactElement => {
  const [field, meta] = useField(rest);

  return (
    <Field className={className}>
      <InputLabelStyled color="primaryDarker" fontSize="normal" fontWeight="light">
        {label}
      </InputLabelStyled>
      <InputStyled {...field} {...rest} fontSize={fontSize} fontWeight={fontWeight} color="primaryDarker" />
      {meta.touched && meta.error ? (
        <FormErrorStyled fontSize={fontSize} fontWeight={fontWeight}>
          {meta.error}
        </FormErrorStyled>
      ) : null}
    </Field>
  );
};

export default FormInput;
