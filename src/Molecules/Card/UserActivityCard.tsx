import React, { ReactElement } from 'react';
import Card from 'Atoms/Card/Card';
import { useQuery } from 'react-query';
import { getUserInfo } from 'API/User';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import Loader from 'Atoms/Loader/Loader';
import getUserActivityItems from 'Services/userActivity';
import List from 'Molecules/List/List';
import moment from 'moment';

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const TitleContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const ContentContainer = styled.div`
  width: 100%;

  border: solid ${props => props.theme.colors.border.cardShadow};
  border-width: 1px 0 0 0;
`;

const ListStyled = styled(List)`
  max-height: 300px;
  overflow-y: auto;
`;

const UserActivityCard = (): ReactElement => {
  const { data, status } = useQuery('userInfo', getUserInfo);

  if (!data || status === 'loading') {
    return <Loader />;
  }

  const activities = data.userActivities.sort((one, two) => {
    const oneStamp = moment(one.timestamp);
    const twoStamp = moment(two.timestamp);

    if (oneStamp.isSame(twoStamp)) {
      return 0;
    } else if (oneStamp.isAfter(twoStamp)) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <CardStyled>
      <TitleContainer>
        <H level="2" fontSize="regular" fontWeight="semiBold" color="primaryDarker">
          Your activity
        </H>
      </TitleContainer>
      <ContentContainer>
        <ListStyled>{activities.map(getUserActivityItems)}</ListStyled>
      </ContentContainer>
    </CardStyled>
  );
};

export default UserActivityCard;
