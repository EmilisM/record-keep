import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import CollectionsFilterCard from 'Organisms/Collection/CollectionsFilterCard';
import CollectionsActionCard from 'Organisms/Collection/CollectionsActionCard';
import CollectionItem from 'Molecules/Collection/CollectionItem';

const CollectionsStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SecondRow = styled.div`
  width: 100%;
`;

const CollectionsFilterCardStyled = styled(CollectionsFilterCard)`
  width: 70%;
`;

const CollectionsActionCardStyled = styled(CollectionsActionCard)`
  width: 30%;
  margin-left: 20px;
`;

const CollectionItemStyled = styled(CollectionItem)`
  margin-top: 20px;
`;

const Collections = (): ReactElement => (
  <CollectionsStyled>
    <FirstRow>
      <CollectionsFilterCardStyled />
      <CollectionsActionCardStyled />
    </FirstRow>
    <SecondRow>
      <CollectionItemStyled name="First" count={56} id="20" />
      <CollectionItemStyled name="First" count={78} id="20" />
    </SecondRow>
  </CollectionsStyled>
);

export default Collections;
