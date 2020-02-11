import React, { ReactNode, ReactElement } from 'react';
import styled from 'styled-components/macro';
import Footer from '../Blocks/Footer';

type Props = {
  className?: string;
  children: ReactNode;
};

const LoginLayoutStyled = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow-y: auto;

  background: ${props => props.theme.colors.background.secondary};
  background-image: linear-gradient(
    110.6deg,
    ${props => props.theme.colors.background.secondary} -18.3%,
    ${props => props.theme.colors.background.secondaryDark} 16.4%,
    ${props => props.theme.colors.background.secondaryDarker} 68.2%,
    ${props => props.theme.colors.background.secondaryDarkest} 99.1%
  );
`;

const Content = styled.div`
  flex: 1 0 auto;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0px 10%;
`;

const FooterStyled = styled(Footer)`
  border-image: linear-gradient(red, blue);
  border: solid ${props => props.theme.colors.background.primary};
  border-width: 1px 0 0 0;
  padding: 0px 10%;
`;

const LoginLayout = ({ className, children }: Props): ReactElement => (
  <LoginLayoutStyled className={className}>
    <Content>{children}</Content>
    <FooterStyled />
  </LoginLayoutStyled>
);

export default LoginLayout;
