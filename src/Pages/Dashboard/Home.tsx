import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import UserCard from 'Organisms/UserCard';
import UserActivityCard from 'Molecules/Card/UserActivityCard';
import UserActivityGraphCard from 'Molecules/Card/UserActivityGraphCard';

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
  width: 65%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const UserActivityGraphCardStyled = styled(UserActivityGraphCard)`
  margin-top: 10px;
`;

const Home = (): ReactElement => (
  <HomeContainer>
    <FirstColumn>
      <UserActivityCard />
    </FirstColumn>
    <SecondColumn>
      <UserCard />
      <UserActivityGraphCardStyled />
    </SecondColumn>
  </HomeContainer>
);

export default Home;
