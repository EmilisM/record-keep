import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import UserCard from 'Organisms/UserCard';
import ErrorBoundary from 'ErrorBoundary';
import UserActivityCard from 'Molecules/Card/UserActivityCard';

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  grid-gap: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-gap: 10px;
    flex-direction: column;
  }
`;

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const UserCardStyled = styled(UserCard)``;

const Home = (): ReactElement => (
  <HomeContainer>
    <FirstColumn>
      <UserActivityCard />
    </FirstColumn>
    <SecondColumn>
      <ErrorBoundary error={error => <div>Custom error here</div>}>
        <UserCardStyled />
      </ErrorBoundary>
    </SecondColumn>
  </HomeContainer>
);

export default Home;
