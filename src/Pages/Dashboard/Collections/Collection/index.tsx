import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCollection } from 'API/Collection';
import { CollectionMatchParams } from 'Types/Collection';
import Loader from 'Atoms/Loader/Loader';
import { RecordCountCard } from 'Molecules/Card/RecordCountCard';
import CollectionInfoCard from 'Molecules/Card/CollectionInfoCard';

const CollectionStyled = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
`;

const ColumnFirst = styled.div`
  width: 33%;
`;

const ColumnSecond = styled.div`
  width: 66%;
  margin-left: 20px;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
`;

type Props = RouteComponentProps<CollectionMatchParams> & {
  setTitle: (newTitle: string) => void;
};

const Collection = ({ setTitle, match }: Props): ReactElement => {
  const { data, status } = useQuery(['collection', match.params.collectionId], (key, id) => getCollection(id));

  useEffect(() => {
    if (data) {
      setTitle(`Collection ${data.name}`);
    }
  }, [data, setTitle]);

  return (
    <CollectionStyled>
      {!data || status === 'loading' ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        [
          <ColumnFirst key="column-first">
            <CollectionInfoCard description={data.description} creationDate={data.creationDate} />
          </ColumnFirst>,
          <ColumnSecond key="column-second">
            <RecordCountCard count={data.recordCount} />
          </ColumnSecond>,
        ]
      )}
    </CollectionStyled>
  );
};

export default Collection;
