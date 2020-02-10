import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import LoginBlock from '../Blocks/Login';
import { HeadingFirst, HeadingSecond } from '../Components/Heading';

const LoginStyled = styled.div`
  width: 100%;
  height: 100%;

  background: ${props => props.theme.colors.background.secondary};
  background-image: linear-gradient(
    110.6deg,
    ${props => props.theme.colors.background.secondary} -18.3%,
    ${props => props.theme.colors.background.secondaryDark} 16.4%,
    ${props => props.theme.colors.background.secondaryDarker} 68.2%,
    ${props => props.theme.colors.background.secondaryDarkest} 99.1%
  );

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  padding: 0px 10%;
`;

const HeadingFirstStyled = styled(HeadingFirst)`
  color: ${props => props.theme.colors.text.primaryLight};
  font-size: 80px;
  margin: 0 0 10px 0;
`;

const HeadingSecondStyled = styled(HeadingSecond)`
  color: ${props => props.theme.colors.text.primaryLight};
  font-weight: ${props => props.theme.font.fontWeight.regular};
  font-size: 40px;
  margin: 0 0 40px 0;
`;

const Login = (): ReactElement => (
  <LoginStyled>
    <HeadingFirstStyled>Record Keep</HeadingFirstStyled>
    <HeadingSecondStyled>An online music collection for avid listeners.</HeadingSecondStyled>
    <LoginBlock />
  </LoginStyled>
);

export default Login;
