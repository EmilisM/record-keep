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

  @media ${props => props.theme.responsive.mobile} {
    flex-direction: column;
  }
`;

const Content = styled.main`
  width: 100%;
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
          <Content>
            <DashboardTitle>{title}</DashboardTitle>
            <Component {...props} />
          </Content>
        </DashboardLayoutStyled>
      )}
    />
  );
};

export default DashboardLayout;
