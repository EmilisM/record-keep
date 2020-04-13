import React, { ReactElement, FormEvent } from 'react';
import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';
import InputLabel from 'Atoms/Input/InputLabel';
import Button from 'Atoms/Button/Button';
import LoginCard from 'Atoms/Card/LoginCard';
import { LoginFormType, LoginField } from 'Types/Login';
import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import FormError from 'Atoms/Error/FormError';
import { getErrorMessage } from 'Types/Error';

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

const FormErrorStyled = styled(FormError)`
  margin: 10px 0 20px;
`;

const FieldErrorStyled = styled(FormError)`
  margin-top: 10px;
`;

type Props = {
  className?: string;
  type: LoginFormType;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  email: LoginField;
  password: LoginField;
  repeatPassword: LoginField;
  formError?: string[];
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
};

const LoginForm = ({
  className,
  type,
  onSubmit,
  email,
  setEmail,
  password,
  formError,
  setPassword,
  repeatPassword,
  setRepeatPassword,
}: Props): ReactElement => (
  <LoginCard className={className}>
    <form onSubmit={onSubmit}>
      <BaseInputContainer>
        <InputLabelStyled fontWeight="regular" htmlFor="form-email">
          Email
        </InputLabelStyled>
        <Input
          fontWeight="light"
          type="email"
          placeholder="Email"
          id="form-email"
          required
          value={email.value}
          onChange={e => setEmail(e.target.value)}
        />
        {email.error && <FieldErrorStyled>{getErrorMessage(email.error)}</FieldErrorStyled>}
      </BaseInputContainer>
      <MiddleInputContainer>
        <InputLabelStyled fontWeight="regular" htmlFor="form-password">
          Password
        </InputLabelStyled>
        <Input
          fontWeight="light"
          type="password"
          placeholder="Password"
          id="form-password"
          required
          value={password.value}
          onChange={e => setPassword(e.target.value)}
        />
        {password.error && <FieldErrorStyled>{getErrorMessage(password.error)}</FieldErrorStyled>}
      </MiddleInputContainer>
      <AnimatedInputContainer type={type}>
        <InputLabelStyled fontWeight="regular" htmlFor="form-repeat-password">
          Repeat password
        </InputLabelStyled>
        <Input
          fontWeight="light"
          type="password"
          placeholder="Password"
          id="form-repeat-password"
          required={type === 'signup'}
          value={repeatPassword.value}
          onChange={e => setRepeatPassword(e.target.value)}
        />
        {repeatPassword.error && <FieldErrorStyled>{getErrorMessage(repeatPassword.error)}</FieldErrorStyled>}
      </AnimatedInputContainer>
      {formError && <FormErrorStyled>{getErrorMessage(formError)}</FormErrorStyled>}
      <ButtonStyled fontWeight="light" type="submit">
        {type === 'login' ? 'Log in' : 'Sign up'}
        <ArrowStyled />
      </ButtonStyled>
    </form>
  </LoginCard>
);

export default LoginForm;
