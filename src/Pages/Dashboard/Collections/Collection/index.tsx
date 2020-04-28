import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCollection } from 'API/Collection';
import { CollectionMatchParams } from 'Types/Collection';

const CollectionStyled = styled.div``;

const RecordCountCard = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;

  width: 33%;
`;

const DescriptionCard = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;

  width: 33%;
  margin-left: 20px;
`;

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;

  width: 33%;
  margin-left: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

type Props = RouteComponentProps<CollectionMatchParams> & {
  setTitle: (newTitle: string) => void;
};

const Collection = ({ setTitle, match }: Props): ReactElement => {
  const { data } = useQuery(['collection', match.params.collectionId], (key, id) => getCollection(id));

  useEffect(() => {
    if (data) {
      setTitle(`Collection ${data.name}`);
    }
  }, [data, setTitle]);

  return (
    <CollectionStyled>
      <Row>
        <RecordCountCard>
          <H fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
            Records
          </H>
          <H fontWeight="light" color="primaryLight" fontSize="regular" level="2">
            56
          </H>
        </RecordCountCard>
        <DescriptionCard>
          <H fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
            Records
          </H>
          <H fontWeight="light" color="primaryLight" fontSize="regular" level="2">
            56
          </H>
        </DescriptionCard>
        <CardStyled>
          <H fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
            Records
          </H>
          <H fontWeight="light" color="primaryLight" fontSize="regular" level="2">
            56
          </H>
        </CardStyled>
      </Row>
    </CollectionStyled>
  );
};

export default Collection;
