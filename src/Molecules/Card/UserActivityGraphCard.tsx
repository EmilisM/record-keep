import React, { ReactElement, useContext } from 'react';
import Card from 'Atoms/Card/Card';
import { useQuery } from 'react-query';
import { getUserInfo } from 'API/User';
import styled, { ThemeContext } from 'styled-components/macro';
import H from 'Atoms/Text/H';
import Loader from 'Atoms/Loader/Loader';
import { LineChart, ResponsiveContainer, Line, Tooltip, TooltipFormatter, XAxis } from 'recharts';
import { countBy, map } from 'lodash';
import moment from 'moment';
import { UserActivityChart } from 'Types/UserActivities';
import { isNumber } from 'Types/General';

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

type Props = {
  className?: string;
};

const UserActivityGraphCard = ({ className }: Props): ReactElement => {
  const theme = useContext(ThemeContext);
  const { data, status } = useQuery('userInfo', getUserInfo);

  if (!data || status === 'loading') {
    return <Loader />;
  }

  const getActivityChartData = (): UserActivityChart[] => {
    const activities = data.userActivities.sort((one, two) => {
      const oneStamp = moment(one.timestamp);
      const twoStamp = moment(two.timestamp);

      if (oneStamp.isSame(twoStamp)) {
        return 0;
      } else if (oneStamp.isAfter(twoStamp)) {
        return 1;
      } else {
        return -1;
      }
    });

    const res = countBy(
      activities.map(a => ({
        name: moment(a.timestamp).format('YYYY-MM-DD'),
      })),
      a => a.name,
    );

    const result = map(res, (v, k) => ({
      name: k,
      count: v,
    }));

    return result;
  };

  const getValueName = (value: number): string => {
    if (value <= 0) {
      return 'No actions';
    } else if (value === 1) {
      return 'action';
    } else {
      return 'actions';
    }
  };

  const formatter: TooltipFormatter = value => {
    if (!isNumber(value)) {
      return value;
    }

    return [`${value} ${getValueName(value)}`];
  };

  return (
    <CardStyled className={className}>
      <TitleContainer>
        <H level="2" fontSize="regular" fontWeight="semiBold" color="primaryDarker">
          Your activity velocity
        </H>
      </TitleContainer>
      <ContentContainer>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={getActivityChartData()}>
            <Tooltip formatter={formatter} label="test" />
            <Line
              dataKey="count"
              type="monotone"
              stroke={theme.colors.special.loaderFirst}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <XAxis dataKey="name" hide />
          </LineChart>
        </ResponsiveContainer>
      </ContentContainer>
    </CardStyled>
  );
};

export default UserActivityGraphCard;
