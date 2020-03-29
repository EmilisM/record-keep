import React, { ReactElement, useState } from 'react';
import styled from 'styled-components/macro';
import CollectionsFilterCard from 'Organisms/Collections/CollectionsFilterCard';
import CollectionItem, { Props as CollectionItemProps } from 'Molecules/Collection/CollectionItem';
import NewCollectionItem from 'Molecules/Collection/NewCollectionItem';
import { ReactComponent as Delete } from 'Assets/Add.svg';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import { ActionMenuOption } from 'Types/ActionMenu';
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

type CollectionItemPicked = Pick<CollectionItemProps, 'title' | 'subTitle'>;

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

const collectionItemsInit: CollectionItemPicked[] = [
  {
    title: 'First',
    subTitle: '56 records',
  },
  {
    title: 'Second',
    subTitle: '76 records',
  },
];

const Collections = (): ReactElement => {
  const [collectionItems, setCollectionItems] = useState<CollectionItemPicked[]>(collectionItemsInit);
  const [isEditable, setIsEditable] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const onClick = (): void => {
    if (!isEditable) {
      setIsEditable(true);
    }
  };

  const onClickComplete = (): void => {
    setCollectionItems([{ title: newCollectionName, subTitle: 'No records' }, ...collectionItems]);
    setNewCollectionName('');
    setIsEditable(false);
  };

  const accoutMenuOnChange = (option: ActionMenuOption): void => {
    console.log(option);
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
          <CollectionItemStyled
            key={`${item.title}-${item.subTitle}`}
            title={item.title}
            subTitle={item.subTitle}
            options={accountMenuOptions}
            onChange={accoutMenuOnChange}
            to={`${RouteConfig.Dashboard.Collections.Root}/${item.title.toLocaleLowerCase()}`}
          />
        ))}
      </SecondRow>
    </CollectionsStyled>
  );
};

export default Collections;
