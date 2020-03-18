import React, { ReactElement } from 'react';
import Card from 'Atoms/Card';
import styled from 'styled-components/macro';

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media ((min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props =>
  props.theme.breakpoints.desktop})) {
    flex-direction: column;
  }
`;

const CardStyled = styled(Card)`
  width: 47%;
  height: 450px;
`;

const Home = (): ReactElement => (
  <HomeContainer>
    <CardStyled>Home</CardStyled>
    <CardStyled>Home</CardStyled>
  </HomeContainer>
);

export default Home;
