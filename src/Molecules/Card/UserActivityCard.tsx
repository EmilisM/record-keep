import React, { ReactElement } from 'react';
import Card from 'Atoms/Card/Card';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import getUserActivityItems from 'Services/userActivity';
import List from 'Molecules/List/List';
import moment from 'moment';
import { UserInfo } from 'Types/User';
import P from 'Atoms/Text/P';

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const TitleContainer = styled.div`
  width: 100%;
  padding: 20px;

  background-color: ${props => props.theme.colors.background.secondaryDark};
  border-radius: 4px 4px 0 0;
`;

const ContentContainer = styled.div`
  width: 100%;

  border: solid ${props => props.theme.colors.border.cardShadow};
  border-width: 1px 0 0 0;
`;

const ListStyled = styled(List)`
  max-height: 400px;
  overflow-y: auto;
`;

const PStyled = styled(P)`
  padding: 10px 20px;
`;

type Props = {
  userInfo: UserInfo;
};

const UserActivityCard = ({ userInfo }: Props): ReactElement => {
  const activities = userInfo.userActivities.sort((one, two) => {
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
        <H level="2" fontSize="regular" fontWeight="semiBold" color="primaryLight">
          Your activity
        </H>
      </TitleContainer>
      <ContentContainer>
        {activities.length <= 0 ? (
          <PStyled color="primaryDarker">No activity yet</PStyled>
        ) : (
          <ListStyled>{activities.map(getUserActivityItems)}</ListStyled>
        )}
      </ContentContainer>
    </CardStyled>
  );
};

export default UserActivityCard;
