import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import LoginBlock from '../Blocks/Login';
import HeadingFirst from '../Components/HeadingFirst';

const LoginStyled = styled.div`
  width: 100%;
  height: 100%;

  background: ${props => props.theme.colors.background.first};
  background-image: linear-gradient(
    110.6deg,
    ${props => props.theme.colors.background.first} -18.3%,
    ${props => props.theme.colors.background.second} 16.4%,
    ${props => props.theme.colors.background.third} 68.2%,
    ${props => props.theme.colors.background.fourth} 99.1%
  );

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  padding: 0px 10%;
`;

const HeadingFirstStyled = styled(HeadingFirst)`
  color: ${props => props.theme.colors.text.secondary};
`;

const Login = (): ReactElement => (
  <LoginStyled>
    <HeadingFirstStyled>Record Keep</HeadingFirstStyled>
    <LoginBlock />
  </LoginStyled>
);

export default Login;
