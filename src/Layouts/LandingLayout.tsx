import React, { ReactNode, ReactElement } from 'react';
import styled from 'styled-components/macro';
import Footer from '../Blocks/Footer';
import TitleBlock from '../Blocks/Title';

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
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 10% 100px;
`;

const FooterStyled = styled(Footer)`
  padding: 0px 10%;

  border-image: linear-gradient(
      110.6deg,
      ${props => props.theme.colors.background.secondaryLighter} -18.3%,
      ${props => props.theme.colors.background.secondaryDarkLighter} 16.4%,
      ${props => props.theme.colors.background.secondaryDarkerLighter} 68.2%,
      ${props => props.theme.colors.background.secondaryDarkestLighter} 99.1%
    )
    1 0 0 / 2px;
`;

const LandingLayout = ({ className, children }: Props): ReactElement => (
  <LoginLayoutStyled className={className}>
    <TitleBlock />
    <Content>{children}</Content>
    <FooterStyled />
  </LoginLayoutStyled>
);

export default LandingLayout;
