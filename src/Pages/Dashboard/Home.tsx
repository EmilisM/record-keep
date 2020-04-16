import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import UserCard from 'Molecules/UserCard';

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

const FirstColumn = styled.div`
  width: 70%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const SecondColumn = styled.div`
  width: 30%;

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
    <FirstColumn></FirstColumn>
    <SecondColumn>
      <UserCard />
    </SecondColumn>
  </HomeContainer>
);

export default Home;
