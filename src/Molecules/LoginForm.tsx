import React, { ReactElement, FormEvent } from 'react';
import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';
import InputLabel from 'Atoms/Input/InputLabel';
import Button from 'Atoms/Button/Button';
import LoginCard from 'Atoms/Card/LoginCard';
import { LoginFormType } from 'Types/Login';
import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import FormError from 'Atoms/Error/FormError';

type StyledProps = {
  type?: LoginFormType;
};

const BaseInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MiddleInputContainer = styled(BaseInputContainer)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AnimatedInputContainer = styled(BaseInputContainer)<StyledProps>`
  transition: all 0.2s ease;
  overflow: hidden;

  max-height: ${props => (props.type === 'signup' ? '100px' : '0px')};
  margin-bottom: ${props => (props.type === 'signup' ? '20px' : '0px')};
`;

const InputLabelStyled = styled(InputLabel)`
  margin-bottom: 5px;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  text-align: left;
  display: flex;
`;

const ArrowStyled = styled(Arrow)`
  height: 25px;
  width: 25px;

  margin: 0 0 0 auto;
  fill: ${props => props.theme.colors.text.primaryDark};
`;

const FormErrorStyled = styled(FormError)`
  margin-bottom: 20px;
`;

type Props = {
  className?: string;
  type: LoginFormType;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  username: string;
  password: string;
  repeatPassword: string;
  formError?: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
};

const LoginForm = ({
  className,
  type,
  onSubmit,
  username,
  setUsername,
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
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
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
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
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
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
        />
      </AnimatedInputContainer>
      {formError && <FormErrorStyled>{formError}</FormErrorStyled>}
      <ButtonStyled fontWeight="light" type="submit">
        {type === 'login' ? 'Log in' : 'Sign up'}
        <ArrowStyled />
      </ButtonStyled>
    </form>
  </LoginCard>
);

export default LoginForm;
