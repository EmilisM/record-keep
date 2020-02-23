import React, { ReactElement, useState } from 'react';

import RadioButton from 'Atoms/Radio';
import RadioButtonOptionType from 'Types/Radio';
import LoginForm from 'Molecules/LoginForm';
import styled from 'styled-components/macro';
import { LoginFormType } from 'Types/Login';

const LoginFormStyled = styled(LoginForm)`
  margin-top: 20px;
`;

const options: RadioButtonOptionType[] = [
  { value: 'login', label: 'Log in' },
  { value: 'signup', label: 'Sign up' },
];

const Login = (): ReactElement => {
  const [activeForm, setActiveForm] = useState<LoginFormType>('login');

  return (
    <>
      <RadioButton
        options={options}
        name="login-switcher"
        fontWeight="light"
        value={activeForm}
        onChange={e => setActiveForm(e.target.value as LoginFormType)}
      />
      <LoginFormStyled type={activeForm} />
    </>
  );
};

export default Login;
