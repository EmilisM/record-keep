import React, { ReactElement, useState } from 'react';
import styled from 'styled-components/macro';
import CollectionsFilterCard from 'Organisms/Collections/CollectionsFilterCard';
import CollectionItem, { Props as CollectionItemProps } from 'Molecules/Collection/CollectionItem';
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

const collectionItemsInit: CollectionItemProps[] = [
  {
    name: 'First',
    count: 56,
  },
  {
    name: 'Second',
    count: 76,
  },
];

const Collections = (): ReactElement => {
  const [collectionItems, setCollectionItems] = useState<CollectionItemProps[]>(collectionItemsInit);
  const [isEditable, setIsEditable] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const onClick = (): void => {
    if (!isEditable) {
      setIsEditable(true);
    }
  };

  const onClickComplete = (): void => {
    setCollectionItems([{ name: newCollectionName, count: 0 }, ...collectionItems]);
    setNewCollectionName('');
    setIsEditable(false);
  };

  return (
    <CollectionsStyled>
      <FirstRow>
        <CollectionsFilterCardStyled />
      </FirstRow>
      <SecondRow>
        <NewCollectionItemStyled
          onClick={onClick}
          onClickComplete={onClickComplete}
          isEditable={isEditable}
          value={newCollectionName}
          onChange={event => setNewCollectionName(event.target.value)}
        />
        {collectionItems.map(item => (
          <CollectionItemStyled key={`${item.name}-${item.count}`} name={item.name} count={item.count} />
        ))}
      </SecondRow>
    </CollectionsStyled>
  );
};

export default Collections;
