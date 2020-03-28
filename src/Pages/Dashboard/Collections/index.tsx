import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import CollectionsFilterCard from 'Organisms/Collections/CollectionsFilterCard';
import CollectionItem from 'Molecules/Collection/CollectionItem';
import NewCollectionItem from 'Molecules/Collection/NewCollectionItem';

const CollectionsStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap-reverse;
  }
`;

const SecondRow = styled.div`
  width: 100%;
`;

const CollectionsFilterCardStyled = styled(CollectionsFilterCard)`
  width: 100%;
`;

const CollectionItemStyled = styled(CollectionItem)`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 10px;
  }
`;

const NewCollectionItemStyled = styled(NewCollectionItem)`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 10px;
  }
`;

const Collections = (): ReactElement => (
  <CollectionsStyled>
    <FirstRow>
      <CollectionsFilterCardStyled />
    </FirstRow>
    <SecondRow>
      <NewCollectionItemStyled />
      <CollectionItemStyled name="First" count={56} />
      <CollectionItemStyled name="First" count={56} />
      <CollectionItemStyled name="First" count={56} />
      <CollectionItemStyled name="First" count={56} />
      <CollectionItemStyled name="First" count={56} />
      <CollectionItemStyled name="First" count={56} />
      <CollectionItemStyled name="First" count={56} />
      <CollectionItemStyled name="First" count={56} />
      <CollectionItemStyled name="First" count={56} />
    </SecondRow>
  </CollectionsStyled>
);

export default Collections;
