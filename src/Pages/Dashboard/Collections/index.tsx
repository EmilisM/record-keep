import React, { ReactElement, useState } from 'react';
import styled from 'styled-components/macro';
import CollectionsFilterCard from 'Organisms/Collections/CollectionsFilterCard';
import CollectionItem from 'Molecules/Collection/CollectionItem';
import NewCollectionItem from 'Molecules/Collection/NewCollectionItem';
import { ReactComponent as Delete } from 'Assets/Add.svg';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import { ActionMenuOption } from 'Types/ActionMenu';
import { CollectionItemOption } from 'Types/Collection';
import { RouteConfig } from 'Routes/RouteConfig';

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

const DeleteStyled = styled(Delete)`
  transform: rotateZ(45deg);
`;

const accountMenuOptions: ActionMenuOption[] = [
  {
    value: 'edit',
    label: 'Edit',
    Icon: Edit,
  },
  {
    value: 'delete',
    label: 'Delete',
    Icon: DeleteStyled,
  },
];

const collectionItemsInit: CollectionItemOption[] = [
  {
    name: 'First',
    value: 'first',
    count: 56,
    isEditable: true,
  },
  {
    name: 'Second',
    value: 'second',
    count: 74,
    isEditable: false,
  },
];

const Collections = (): ReactElement => {
  const [collectionItems, setCollectionItems] = useState<CollectionItemOption[]>(collectionItemsInit);
  const [isEditable, setIsEditable] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const onClickNewCollection = (): void => {
    if (!isEditable) {
      setIsEditable(true);
    }
  };

  const onSubmitNewCollection = (): void => {
    setCollectionItems([{ name: newCollectionName, count: 32, value: 'first', isEditable: false }, ...collectionItems]);
    setNewCollectionName('');
    setIsEditable(false);
  };

  const accountMenuOnChange = (): void => {};

  return (
    <CollectionsStyled>
      <FirstRow>
        <CollectionsFilterCardStyled />
      </FirstRow>
      <SecondRow>
        <NewCollectionItemStyled
          onClick={onClickNewCollection}
          onSubmit={onSubmitNewCollection}
          isEditable={isEditable}
          value={newCollectionName}
          onChange={event => setNewCollectionName(event.target.value)}
        />
        {collectionItems.map((item, index) => (
          <CollectionItemStyled
            to={RouteConfig.Dashboard.Collections.Collection}
            key={`${item.name}-${item.count}`}
            title={item.name}
            subTitle={`${item.count} ${item.count === 1 ? 'record' : 'records'}`}
            accountMenuOptions={accountMenuOptions}
            accountMenuOnChange={accountMenuOnChange}
          />
        ))}
      </SecondRow>
    </CollectionsStyled>
  );
};

export default Collections;
