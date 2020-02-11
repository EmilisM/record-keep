import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import LoginBlock from '../Blocks/Login';
import Heading from '../Components/Heading';
import LoginLayout from '../Layouts/LoginLayout';

const HeadingFirstStyled = styled(Heading)`
  color: ${props => props.theme.colors.text.primaryLight};
  margin: 0 0 10px 0;
`;

const HeadingSecondStyled = styled(Heading)`
  color: ${props => props.theme.colors.text.primaryLight};
  margin: 0 0 40px 0;
`;

const Login = (): ReactElement => (
  <LoginLayout>
    <HeadingFirstStyled fontWeight="600" fontSize={80} level="1">
      Record Keep
    </HeadingFirstStyled>
    <HeadingSecondStyled fontSize={40} level="2">
      An online music collection for avid listeners.
    </HeadingSecondStyled>
    <LoginBlock />
  </LoginLayout>
);

export default Login;
