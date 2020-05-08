import React, { ReactElement, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import { AreaChart, ResponsiveContainer, Area, Tooltip, XAxis } from 'recharts';
import { GenreProgression } from 'Types/Genre';
import H from 'Atoms/Text/H';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 20px;

  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 15px 10px;
  }
`;

const ResponsiveContainerStyled = styled(ResponsiveContainer)`
  margin-top: 20px;
`;

const HStyled = styled(H)`
  margin-top: 10px;
`;

type Props = {
  className?: string;
  genreProgression: GenreProgression[];
};

const GenreProgressionCard = ({ className, genreProgression }: Props): ReactElement => {
  const theme = useContext(ThemeContext);

  const getColor = (index: number): string => {
    return theme.colors.special.chartColorsPrimary[index];
  };

  return (
    <CardStyled className={className}>
      <H level="2" color="primaryLight" fontWeight="semiBold" fontSize="normal">
        Collection genre progression
      </H>
      {genreProgression.length !== 0 ? (
        <ResponsiveContainerStyled width="100%" height={300}>
          <AreaChart data={genreProgression} stackOffset="expand">
            <XAxis dataKey="name" stroke={theme.colors.text.primaryLight} interval="preserveStartEnd" />
            {Object.keys(genreProgression[0].genres).map((genre, i) => (
              <Area
                key={genre}
                type="monotone"
                name={genre}
                dataKey={`genres.${genre}`}
                stackId="1"
                stroke={getColor(i)}
                fill={getColor(i)}
              />
            ))}
            <Tooltip />
          </AreaChart>
        </ResponsiveContainerStyled>
      ) : (
        <HStyled level="3" color="primaryLight" fontWeight="regular" fontSize="normal">
          No records in your collection
        </HStyled>
      )}
    </CardStyled>
  );
};

export default GenreProgressionCard;
