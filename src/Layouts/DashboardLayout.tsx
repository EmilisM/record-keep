import React, { ReactElement, FC, useState } from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components/macro';

import DashboardMenu from 'Organisms/Dashboard/DashboardMenu';
import DashboardMenuMobile from 'Organisms/Dashboard/DashboardMenuMobile';
import DashboardHeader from 'Organisms/Dashboard/DashboardHeader';
import { isString } from 'Types/General';

type Props<T> = RouteProps & {
  component: FC<RouteComponentProps<T>>;
  title: string | ((params: T) => string);
};

const DashboardLayoutStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
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

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: 4px 4px 0 0;
    padding: 10px;
  }
`;

interface StyledProps {
  isOpen: boolean;
}

const ContentContainer = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  margin-left: ${props => (props.isOpen ? '300px' : '60px')};
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-left: 0;
  }

  transition: all 300ms ease;
`;

function DashboardLayout<T>({ component: Component, title, ...rest }: Props<T>): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<T>) => (
        <DashboardLayoutStyled>
          <DashboardMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          <DashboardMenuMobile isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          <ContentContainer isOpen={isOpen}>
            <DashboardHeader title={isString(title) ? title : title(props.match.params)} />
            <Content>
              <Component {...props} />
            </Content>
          </ContentContainer>
        </DashboardLayoutStyled>
      )}
    />
  );
}

export default DashboardLayout;
