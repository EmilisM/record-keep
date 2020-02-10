import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

const LoginBlockStyled = styled.div`
  width: 50%;
  height: 50%;
`;

const LoginBlock = (): ReactElement => <LoginBlockStyled></LoginBlockStyled>;

export default LoginBlock;
