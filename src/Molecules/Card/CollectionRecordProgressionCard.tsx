import React, { ReactElement, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import { RecordProgression } from 'Types/Record';
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, TooltipFormatter } from 'recharts';
import { isNumber } from 'Types/General';

const CardStyled = styled(Card)`
  width: 100%;
`;

const TitleContainer = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  border-radius: 4px 4px 0 0;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 10px 20px;
  }
`;

type Props = {
  className?: string;
  recordProgression: RecordProgression[];
};

const CollectionRecordProgressionCard = ({ className, recordProgression }: Props): ReactElement => {
  const theme = useContext(ThemeContext);

  const getValueName = (value: number): string => {
    if (value <= 0) {
      return 'No records';
    } else if (value === 1) {
      return 'record';
    } else {
      return 'records';
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
        <H level="2" color="primaryLight" fontWeight="semiBold" fontSize="normal">
          Record progression
        </H>
      </TitleContainer>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={recordProgression}>
          <Tooltip formatter={formatter} />
          <Line
            dataKey="value"
            type="monotone"
            stroke={theme.colors.background.secondaryDarker}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <XAxis dataKey="name" hide />
        </LineChart>
      </ResponsiveContainer>
    </CardStyled>
  );
};

export default CollectionRecordProgressionCard;
