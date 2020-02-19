import React, { ReactElement, FC } from 'react';
import styled from 'styled-components/macro';
import { Route, RouteProps, RouteComponentProps, useHistory } from 'react-router-dom';

import Footer from 'Molecules/Footer';
import LandingTitle from 'Organisms/LandingTitle';
import RouteConfig from 'Routes/RouteConfig';

type StyledProps = {
  backgroundPosition: string;
};

const LoginLayoutStyled = styled.main<StyledProps>`
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow-y: auto;

  background: ${props => props.theme.colors.background.secondary};
  background-image: linear-gradient(
    110deg,
    ${props => props.theme.colors.background.secondary} -10%,
    ${props => props.theme.colors.background.secondaryDark} 10%,
    ${props => props.theme.colors.background.secondaryDarker} 40%,
    ${props => props.theme.colors.background.secondaryDarkest} 100%
  );

  background-size: 300% 100%;
  transition: 1s background-position-x ease;

  background-position-x: ${props => props.backgroundPosition};
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
      110deg,
      ${props => props.theme.colors.background.secondaryLighter} -10%,
      ${props => props.theme.colors.background.secondaryDarkLighter} 10%,
      ${props => props.theme.colors.background.secondaryDarkerLighter} 40%,
      ${props => props.theme.colors.background.secondaryDarkestLighter} 100%
    )
    1 0 0 / 2px;
`;

type Props = RouteProps & {
  component: FC<RouteComponentProps>;
};

const getBackgroundPositionX = (pathname: string): string => {
  switch (pathname) {
    default:
    case RouteConfig.Home:
      return '0%';
    case RouteConfig.Login:
      return '50%';
    case RouteConfig.About:
      return '100%';
  }
};

const LandingLayout = ({ component: Component, ...rest }: Props): ReactElement => {
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={props => (
        <LoginLayoutStyled backgroundPosition={getBackgroundPositionX(history.location.pathname)}>
          <LandingTitle />
          <Content>
            <Component {...props} />
          </Content>
          <FooterStyled />
        </LoginLayoutStyled>
      )}
    />
  );
};

export default LandingLayout;
