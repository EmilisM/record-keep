import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from '../Components/Card';

const LoginBlockStyled = styled.div`
  width: 100%;
  height: 50%;
  max-width: 800px;
`;

const LoginBlock = (): ReactElement => (
  <LoginBlockStyled>
    <Card />
  </LoginBlockStyled>
);

export default LoginBlock;
