import React, { ReactElement, FC, useState } from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components/macro';
import DashboardMenu from 'Molecules/DashboardMenu';

type Props = RouteProps & {
  component: FC<RouteComponentProps>;
};

const DashboardLayoutStyled = styled.div`
  display: flex;
  flex-direction: row;

  flex: 1;
`;

const Content = styled.main`
  width: 100%;
`;

const DashboardMenuStyled = styled(DashboardMenu)``;

const DashboardLayout = ({ component: Component, ...rest }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Route
      {...rest}
      render={props => (
        <DashboardLayoutStyled>
          <DashboardMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          <Content>
            <Component {...props} />
          </Content>
        </DashboardLayoutStyled>
      )}
    />
  );
};

export default DashboardLayout;
