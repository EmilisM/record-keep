import React, { ReactElement, useContext } from 'react';
import Card from 'Atoms/Card/Card';
import styled, { ThemeContext } from 'styled-components/macro';
import H from 'Atoms/Text/H';
import { ResponsiveContainer, PolarGrid, PolarAngleAxis, Radar, RadarChart, Tooltip, TooltipFormatter } from 'recharts';
import { RecordGenre } from 'Types/Record';
import Loader from 'Atoms/Loader/Loader';
import { getRecordCountText } from 'Services/collection';
import { isNumber } from 'Types/General';

const CardStyled = styled(Card)`
  padding: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 10px;
  }
`;

const ResponsiveContainerStyled = styled(ResponsiveContainer)`
  margin-top: 20px;
`;

type Props = {
  className?: string;
  genres: RecordGenre[] | null;
};

const CollectionCompositionCard = ({ className, genres }: Props): ReactElement => {
  const theme = useContext(ThemeContext);

  if (!genres) {
    return (
      <CardStyled className={className}>
        <Loader />
      </CardStyled>
    );
  }

  const formatter: TooltipFormatter = (name, value) => {
    if (!isNumber(name)) {
      return [name, value];
    }

    return [getRecordCountText(name)];
  };

  return (
    <CardStyled className={className}>
      <H level="2" color="primaryDarker" fontWeight="semiBold" fontSize="regular">
        Collection genre composition
      </H>
      <ResponsiveContainerStyled width="100%" height={250}>
        <RadarChart data={genres}>
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
      </ResponsiveContainerStyled>
    </CardStyled>
  );
};

export default CollectionCompositionCard;
