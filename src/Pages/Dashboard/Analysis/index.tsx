import React, { ReactElement, useState } from 'react';
import styled from 'styled-components/macro';
import FilterCard from 'Molecules/Card/FilterCard';
import { useQuery } from 'react-query';
import useDebounce from 'Services/Hooks/useDebounce';
import { getCollections } from 'API/Collection';
import Loader from 'Atoms/Loader/Loader';
import CollectionItem from 'Molecules/Collection/CollectionItem';
import { RouteConfig } from 'Routes/RouteConfig';
import { getRecordCountText } from 'Services/collection';

const AnalysisPageStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`;

const CollectionItemStyled = styled(CollectionItem)`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 10px;
  }
`;

const Analysis = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data, status } = useQuery(['collections', debouncedSearchQuery], (key, query) => getCollections(query));

  return (
    <AnalysisPageStyled>
      <FilterCard
        placeholder="Collection name"
        label="Search collections for analysis"
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      {!data || status === 'loading' ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        data.map(c => (
          <CollectionItemStyled
            key={c.id}
            to={`${RouteConfig.Dashboard.Analysis.Root}/${c.id}`}
            title={c.name}
            subTitle={getRecordCountText(c.recordCount)}
            image={c.image?.data}
          />
        ))
      )}
    </AnalysisPageStyled>
  );
};

export default Analysis;
