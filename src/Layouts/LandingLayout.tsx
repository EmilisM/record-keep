import React, { ReactElement, FC } from 'react';
import styled from 'styled-components/macro';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';

import Footer from 'Molecules/Footer';
import TitleBlock from 'Molecules/Title';

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

type Props = RouteProps & {
  component: FC<RouteComponentProps>;
};

const LandingLayout = ({ component: Component, ...rest }: Props): ReactElement => (
  <Route
    {...rest}
    render={props => (
      <LoginLayoutStyled>
        <TitleBlock />
        <Content>
          <Component {...props} />
        </Content>
        <FooterStyled />
      </LoginLayoutStyled>
    )}
  />
);

export default LandingLayout;
