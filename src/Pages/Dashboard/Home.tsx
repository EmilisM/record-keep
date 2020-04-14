import React, { ReactElement } from 'react';
import Card from 'Atoms/Card/Card';
import styled from 'styled-components/macro';
import UserCard from 'Molecules/UserCard';

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

const CardStyled = styled(Card)`
  width: 50%;
  height: 450px;

  &:not(:first-child) {
    margin-left: 20px;
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;

    &:not(:first-child) {
      margin-top: 20px;
    }
  }
`;

const Home = (): ReactElement => (
  <HomeContainer>
    <CardStyled>Home</CardStyled>
    <UserCard />
  </HomeContainer>
);

export default Home;
