import React, { ReactElement, useContext } from 'react';
import Card from 'Atoms/Card/Card';
import styled, { ThemeContext } from 'styled-components/macro';
import H from 'Atoms/Text/H';
import { ResponsiveContainer, PolarGrid, PolarAngleAxis, Radar, RadarChart, Tooltip, TooltipFormatter } from 'recharts';
import { isNumber } from 'Types/General';
import { RecordFormatComposition } from 'Types/RecordFormat';
import { getRecordCountText } from 'Services/collection';

const TitleContainer = styled.div`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 20px;
  border-radius: 4px 4px 0 0;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 10px;
  }
`;

type Props = {
  className?: string;
  recordFormatComposition: RecordFormatComposition[];
};

const CollectionRecordFormatCard = ({ className, recordFormatComposition }: Props): ReactElement => {
  const theme = useContext(ThemeContext);

  const formatter: TooltipFormatter = (name, value) => {
    if (!isNumber(name)) {
      return [name, value];
    }

    return [getRecordCountText(name)];
  };

  return (
    <Card className={className}>
      <TitleContainer>
        <H level="2" color="primaryLight" fontWeight="semiBold" fontSize="normal">
          Record format composition
        </H>
      </TitleContainer>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={recordFormatComposition}>
          <Tooltip formatter={formatter} separator=" " />
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis dataKey="name" />
          <Radar
            dataKey="value"
            stroke={theme.colors.background.secondaryDarker}
            fill={theme.colors.background.secondaryDarker}
            fillOpacity={0.8}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CollectionRecordFormatCard;
