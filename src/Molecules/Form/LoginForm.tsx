import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';
import InputLabel from 'Atoms/Input/InputLabel';
import Button from 'Atoms/Button/Button';
import LoginCard from 'Atoms/Card/LoginCard';
import { LoginFormType, LoginFormFields } from 'Types/Login';
import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import FormError from 'Atoms/Error/FormError';
import { Formik, FormikHelpers, FormikErrors } from 'formik';

type StyledProps = {
  type?: LoginFormType;
};

const BaseInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MiddleInputContainer = styled(BaseInputContainer)`
  margin-top: 20px;
`;

const AnimatedInputContainer = styled(BaseInputContainer)<StyledProps>`
  transition: all 0.2s ease;
  overflow: hidden;

  max-height: ${props => (props.type === 'signup' ? '118px' : '0px')};
  margin-top: ${props => (props.type === 'signup' ? '20px' : '0px')};
`;

const InputLabelStyled = styled(InputLabel)`
  margin-bottom: 5px;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  text-align: left;
  display: flex;
  margin-top: 20px;
`;

const ArrowStyled = styled(Arrow)`
  height: 25px;
  width: 25px;

  margin: 0 0 0 auto;
  fill: ${props => props.theme.colors.text.primaryDark};
`;

const FieldErrorStyled = styled(FormError)`
  margin-top: 10px;
`;

const FormErrorStyled = styled(FormError)`
  margin-top: 20px;
`;

type Props = {
  className?: string;
  type: LoginFormType;
  onSubmit: (values: LoginFormFields, helpers: FormikHelpers<LoginFormFields>) => void;
  validate: (values: LoginFormFields) => FormikErrors<LoginFormFields>;
  initialValue: LoginFormFields;
};

const LoginForm = ({ className, type, onSubmit, validate, initialValue }: Props): ReactElement => (
  <LoginCard className={className}>
    <Formik initialValues={initialValue} validate={validate} onSubmit={onSubmit}>
      {({ getFieldProps, errors, touched, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <BaseInputContainer>
            <InputLabelStyled htmlFor="email">Email</InputLabelStyled>
            <Input fontWeight="light" type="email" placeholder="Email" {...getFieldProps('email')} />
            {touched.email && errors.email && <FieldErrorStyled>{errors.email}</FieldErrorStyled>}
          </BaseInputContainer>
          <MiddleInputContainer>
            <InputLabelStyled htmlFor="password">Password</InputLabelStyled>
            <Input fontWeight="light" type="password" placeholder="Password" {...getFieldProps('password')} />
            {touched.password && errors.password && <FieldErrorStyled>{errors.password}</FieldErrorStyled>}
          </MiddleInputContainer>
          <AnimatedInputContainer type={type}>
            <InputLabelStyled htmlFor="repeatPassword">Repeat password</InputLabelStyled>
            <Input
              fontWeight="light"
              type="password"
              placeholder="Repeat password"
              {...getFieldProps('repeatPassword')}
            />
            {touched.repeatPassword && errors.repeatPassword && (
              <FieldErrorStyled>{errors.repeatPassword}</FieldErrorStyled>
            )}
          </AnimatedInputContainer>
          {errors.form && <FormErrorStyled>{errors.form}</FormErrorStyled>}
          <ButtonStyled fontWeight="light" type="submit" disabled={isSubmitting}>
            {type === 'login' ? 'Log in' : 'Sign up'}
            <ArrowStyled />
          </ButtonStyled>
        </form>
      )}
    </Formik>
  </LoginCard>
);

export default LoginForm;
