import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';
import InputLabel from 'Atoms/Input/InputLabel';
import Button from 'Atoms/Button';
import LoginCard from 'Atoms/LoginCard';
import { LoginFormType } from 'Types/Login';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const InputLabelStyled = styled(InputLabel)`
  margin-bottom: 5px;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  margin-top: 20px;
  text-align: left;
`;

type Props = {
  className?: string;
  type: LoginFormType;
};

const LoginForm = ({ className, type }: Props): ReactElement => (
  <LoginCard className={className}>
    <InputContainer>
      <InputLabelStyled fontWeight="regular" htmlFor="form-email">
        Email
      </InputLabelStyled>
      <Input fontWeight="light" type="email" placeholder="Email" id="form-email" />
    </InputContainer>
    <InputContainer>
      <InputLabelStyled fontWeight="regular" htmlFor="form-password">
        Password
      </InputLabelStyled>
      <Input fontWeight="light" type="password" placeholder="Password" id="form-password" />
    </InputContainer>
    {type === 'signup' && (
      <InputContainer>
        <InputLabelStyled fontWeight="regular" htmlFor="form-repeat-password">
          Repeat password
        </InputLabelStyled>
        <Input fontWeight="light" type="password" placeholder="Password" id="form-repeat-password" />
      </InputContainer>
    )}
    <ButtonStyled fontWeight="light">{type === 'login' ? 'Log in' : 'Sign up'}</ButtonStyled>
  </LoginCard>
);

export default LoginForm;
