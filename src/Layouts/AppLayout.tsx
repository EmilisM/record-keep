import React, { ReactNode, ReactElement } from 'react';
import styled from 'styled-components/macro';
import Footer from '../Blocks/Footer';

type Props = {
  children: ReactNode;
};

const AppLayoutMain = styled.main`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 48px;

  box-shadow: 0px 6px 12px ${props => props.theme.colors.background.secondaryDark};
`;

const AppLayout = ({ children }: Props): ReactElement => (
  <AppLayoutMain>
    <Content>{children}</Content>
    <Footer />
  </AppLayoutMain>
);

export default AppLayout;
