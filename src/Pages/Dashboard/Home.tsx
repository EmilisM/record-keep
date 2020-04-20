import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import UserCard from 'Organisms/UserCard';
import Card from 'Atoms/Card/Card';

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  grid-template-columns: auto 400px;
  grid-template-rows: auto 1fr;
  grid-gap: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: column;
  }
`;

const UserCardStyled = styled(UserCard)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

const GridStyled = styled(Card)`
  grid-column: 0 / 1;
  grid-row: 0 / 1;

  width: 100%;
  height: 100%;
`;

const Home = (): ReactElement => (
  <HomeContainer>
    <GridStyled />
    <UserCardStyled />
  </HomeContainer>
);

export default Home;
