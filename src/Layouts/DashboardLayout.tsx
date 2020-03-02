import React, { ReactElement, FC } from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components/macro';

type Props = RouteProps & {
  component: FC<RouteComponentProps>;
};

const DashboardLayoutStyled = styled.div``;

const Content = styled.main``;

const DashboardLayout = ({ component: Component, ...rest }: Props): ReactElement => {
  return (
    <Route
      {...rest}
      render={props => (
        <DashboardLayoutStyled>
          <Content>
            <Component {...props} />
          </Content>
        </DashboardLayoutStyled>
      )}
    />
  );
};

export default DashboardLayout;
