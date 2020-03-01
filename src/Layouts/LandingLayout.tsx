import React, { ReactElement, FC } from 'react';
import styled from 'styled-components/macro';
import { Route, RouteProps, RouteComponentProps, useLocation } from 'react-router-dom';

import Footer from 'Molecules/Footer';
import LandingTitle from 'Organisms/LandingTitle';
import RouteConfig from 'Routes/RouteConfig';

type StyledProps = {
  backgroundPosition: string;
};

const LandingLayoutStyled = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;

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

const Content = styled.main`
  flex: 1 0 auto;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 10% 20px;

  @media ${props => props.theme.responsive.mobile} {
    padding: 0 5% 20px;
  }
`;

const FooterStyled = styled(Footer)`
  padding: 10px 10%;

  border-image: linear-gradient(
      110deg,
      ${props => props.theme.colors.background.secondaryLighter} -10%,
      ${props => props.theme.colors.background.secondaryDarkLighter} 10%,
      ${props => props.theme.colors.background.secondaryDarkerLighter} 40%,
      ${props => props.theme.colors.background.secondaryDarkestLighter} 100%
    )
    1 0 0 / 2px;

  @media ${props => props.theme.responsive.mobile} {
    padding: 10px 6%;
  }
`;

type Props = RouteProps & {
  component: FC<RouteComponentProps>;
};

const getBackgroundPositionX = (pathname?: string): string => {
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
  const location = useLocation<{ from: string }>();

  return (
    <Route
      {...rest}
      render={props => (
        <LandingLayoutStyled backgroundPosition={getBackgroundPositionX(location?.pathname)}>
          <LandingTitle />
          <Content>
            <Component {...props} />
          </Content>
          <FooterStyled />
        </LandingLayoutStyled>
      )}
    />
  );
};

export default LandingLayout;
