import React, { ReactElement, useState } from 'react';
import styled from 'styled-components/macro';
import FilterCard from 'Molecules/Card/FilterCard';
import CollectionItem from 'Molecules/Collection/CollectionItem';
import NewCollectionItem from 'Molecules/Collection/NewCollectionItem';
import { ReactComponent as Delete } from 'Assets/Add.svg';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import { ActionMenuOption } from 'Types/ActionMenu';
import { RouteConfig } from 'Routes/RouteConfig';
import { useQuery, useMutation } from 'react-query';
import {
  getCollections,
  createCollection as createCollectionAPI,
  deleteCollection as deleteCollectionAPI,
} from 'API/Collection';
import Loader from 'Atoms/Loader/Loader';
import { toast } from 'react-toastify';
import EditCollectionModal from 'Organisms/Modal/EditCollectionModal';
import CollectionDeleteModal from 'Organisms/Modal/CollectionDeleteModal';
import { Collection, CollectionDeleteFields } from 'Types/Collection';
import { FormikHelpers } from 'formik';
import useDebounce from 'Services/Hooks/useDebounce';

const CollectionsStyled = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
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

const FilterCardStyled = styled(FilterCard)`
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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
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

const Collections = (): ReactElement => {
  const [isEditable, setIsEditable] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deletionModalOpen, setDeletionModalOpen] = useState(false);

  const [nameSearch, setNameSearch] = useState<string>('');
  const nameSearchDebounced = useDebounce(nameSearch, 300);

  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const { data, status, refetch } = useQuery(['collections', nameSearchDebounced], (key, name) => getCollections(name));

  const [createCollection] = useMutation(createCollectionAPI, { throwOnError: true });
  const [deleteCollection] = useMutation(deleteCollectionAPI);

  const onClickNewCollection = (): void => {
    if (!isEditable) {
      setIsEditable(true);
    }
  };

  const onSubmitNewCollection = (): void => {
    if (newCollectionName) {
      createCollection({ name: newCollectionName })
        .then(() => refetch())
        .then(() => {
          setNewCollectionName('');
          setIsEditable(false);
          toast.success('New collection created');
        });
    }
  };

  const onClearNewCollection = (): void => {
    setIsEditable(false);
  };

  const accountMenuOnChange = (option: ActionMenuOption, index: number): void => {
    if (!data) {
      return;
    }

    setActiveCollection(data[index]);

    if (option.value === 'edit') {
      setEditModalOpen(true);
    } else if (option.value === 'delete') {
      setDeletionModalOpen(true);
    }
  };

  const onSubmitDelete = (values: CollectionDeleteFields, helpers: FormikHelpers<CollectionDeleteFields>): void => {
    if (!activeCollection) {
      return;
    }

    const id = activeCollection.id;

    deleteCollection({ id, destinationId: values.destination && values.destination.value })
      .then(() => refetch())
      .then(() => {
        helpers.setSubmitting(false);
        helpers.resetForm();
        toast.success('Collection delete completed');
        setDeletionModalOpen(false);
      });
  };

  const getCollectionItemSubTitle = (count: number): string => {
    if (count === 1) {
      return `${count} record`;
    } else if (count > 1) {
      return `${count} records`;
    } else {
      return 'No records';
    }
  };

  return (
    <CollectionsStyled>
      <FirstRow>
        <FilterCardStyled
          label="Search for collections"
          placeholder="Collection name"
          value={nameSearch}
          onChange={event => setNameSearch(event.target.value)}
        />
      </FirstRow>
      <SecondRow>
        <NewCollectionItemStyled
          onClick={onClickNewCollection}
          onSubmit={onSubmitNewCollection}
          isEditable={isEditable}
          value={newCollectionName}
          onChange={event => setNewCollectionName(event.target.value)}
          onClear={onClearNewCollection}
        />
        {data &&
          data.map((item, index) => (
            <CollectionItemStyled
              to={`${RouteConfig.Dashboard.Collections.Root}/${item.id}`}
              key={item.id}
              title={item.name}
              subTitle={getCollectionItemSubTitle(item.recordCount)}
              accountMenuOptions={accountMenuOptions}
              accountMenuOnChange={option => accountMenuOnChange(option, index)}
              image={item.image?.data}
            />
          ))}
      </SecondRow>
      {status === 'loading' || !data ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : null}
      {data && activeCollection ? (
        <>
          <EditCollectionModal
            isOpen={editModalOpen}
            onRequestClose={() => setEditModalOpen(false)}
            refetch={refetch}
            collection={activeCollection}
          />
          <CollectionDeleteModal
            isOpen={deletionModalOpen}
            onRequestClose={() => setDeletionModalOpen(false)}
            onSubmit={onSubmitDelete}
            activeCollection={activeCollection}
            collections={data}
          />
        </>
      ) : null}
    </CollectionsStyled>
  );
};

export default Collections;
