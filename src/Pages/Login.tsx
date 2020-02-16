import React, { ReactElement } from 'react';
import LoginBlock from '../Blocks/Login';
import LandingLayout from '../Layouts/LandingLayout';

const Login = (): ReactElement => (
  <LandingLayout>
    <LoginBlock />
  </LandingLayout>
);

export default Login;
