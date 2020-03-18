import React, { ReactElement, FC, useState } from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components/macro';

import DashboardTitle from 'Molecules/DashboardTitle';
import DashboardMenu from 'Organisms/Dashboard/DashboardMenu';
import DashboardMenuMobile from 'Organisms/Dashboard/DashboardMenuMobile';

type Props = RouteProps & {
  component: FC<RouteComponentProps>;
  title: string;
};

const DashboardLayoutStyled = styled.div`
  display: flex;
  flex-direction: row;

  flex: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }

  background-image: linear-gradient(
    110deg,
    ${props => props.theme.colors.background.secondary} -10%,
    ${props => props.theme.colors.background.secondaryDark} 10%,
    ${props => props.theme.colors.background.secondaryDarker} 40%,
    ${props => props.theme.colors.background.secondaryDarkest} 100%
  );
`;

const Content = styled.main`
  width: 100%;
  height: 100%;

  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.background.primaryLight},
    ${props => props.theme.colors.background.primary}
  );
  border-radius: 4px 4px 0;

  padding: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: 4px 4px 0 0;
    padding: 10px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const DashboardLayout = ({ component: Component, title, ...rest }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Route
      {...rest}
      render={props => (
        <DashboardLayoutStyled>
          <DashboardMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          <DashboardMenuMobile isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          <ContentContainer>
            <DashboardTitle>{title}</DashboardTitle>
            <Content>
              <Component {...props} />
            </Content>
          </ContentContainer>
        </DashboardLayoutStyled>
      )}
    />
  );
};

export default DashboardLayout;
