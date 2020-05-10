import React, { ReactElement, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import { AreaChart, ResponsiveContainer, Area, Tooltip, XAxis } from 'recharts';
import H from 'Atoms/Text/H';
import { RecordTypeProgression } from 'Types/RecordType';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};

  width: 100%;
`;

const HStyled = styled(H)`
  margin-top: 10px;
`;

const TitleContainer = styled.div`
  padding: 20px;
`;

const ContentContainer = styled.div`
  padding: 0 20px 20px;
`;

type Props = {
  className?: string;
  recordTypeProgression: RecordTypeProgression[];
};

const CollectionRecordTypeCard = ({ className, recordTypeProgression }: Props): ReactElement => {
  const theme = useContext(ThemeContext);

  const getColor = (index: number): string => {
    return theme.colors.special.chartColorsPrimary[index];
  };

  return (
    <CardStyled className={className}>
      <TitleContainer>
        <H level="2" color="primaryLight" fontWeight="semiBold" fontSize="normal">
          Record type progression
        </H>
      </TitleContainer>
      <ContentContainer>
        {recordTypeProgression.length !== 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={recordTypeProgression} stackOffset="expand">
              <XAxis dataKey="name" stroke={theme.colors.text.primaryLight} interval="preserveStartEnd" />
              {Object.keys(recordTypeProgression[0].recordTypes).map((rt, i) => (
                <Area
                  key={rt}
                  type="monotone"
                  name={rt}
                  dataKey={`recordTypes.${rt}`}
                  stackId="1"
                  stroke={getColor(i)}
                  fill={getColor(i)}
                />
              ))}
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <HStyled level="3" color="primaryLight" fontWeight="regular" fontSize="normal">
            No records in your collection
          </HStyled>
        )}
      </ContentContainer>
    </CardStyled>
  );
};

export default CollectionRecordTypeCard;
