import React, { ReactElement, FC, useState } from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components/macro';

import DashboardMenu from 'Organisms/DashboardMenu';
import MobileMenu from 'Organisms/MobileMenu';

type Props = RouteProps & {
  component: FC<RouteComponentProps>;
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

const DashboardLayout = ({ component: Component, ...rest }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Route
      {...rest}
      render={props => (
        <DashboardLayoutStyled>
          <DashboardMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          <MobileMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          <Content>
            <Component {...props} />
          </Content>
        </DashboardLayoutStyled>
      )}
    />
  );
};

export default DashboardLayout;
