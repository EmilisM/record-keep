import React, { ReactElement, useReducer } from 'react';
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
import { CollectionDeleteFields } from 'Types/Collection';
import { FormikHelpers } from 'formik';
import useDebounce from 'Services/Hooks/useDebounce';
import { reducer, initialState } from 'State/Collections';

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
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchQueryDebounced = useDebounce(state.searchQuery, 300);
  const { data, status, refetch } = useQuery(['collections', searchQueryDebounced], (key, name) =>
    getCollections(name),
  );

  const [createCollection] = useMutation(createCollectionAPI, { throwOnError: true });
  const [deleteCollection] = useMutation(deleteCollectionAPI);

  const onClickNewCollection = (): void => {
    if (!state.isCreating) {
      dispatch({ type: 'isCreating/set', payload: true });
    }
  };

  const onSubmitNewCollection = (): void => {
    createCollection({ name: state.newCollectionName })
      .then(() => refetch())
      .then(() => {
        dispatch({ type: 'newCollectionName/set', payload: '' });
        dispatch({ type: 'isCreating/set', payload: false });
        toast.success('New collection created');
      });
  };

  const onClearNewCollection = (): void => {
    dispatch({ type: 'isCreating/set', payload: false });
  };

  const accountMenuOnChange = (option: ActionMenuOption, index: number): void => {
    if (!data) {
      return;
    }

    dispatch({ type: 'activeCollection/set', payload: data[index] });

    if (option.value === 'edit') {
      dispatch({ type: 'editModal/open' });
    } else if (option.value === 'delete') {
      dispatch({ type: 'deletionModal/open' });
    }
  };

  const onSubmitDelete = (values: CollectionDeleteFields, helpers: FormikHelpers<CollectionDeleteFields>): void => {
    if (!state.activeCollection) {
      return;
    }

    const id = state.activeCollection.id;

    deleteCollection({ id, destinationId: values.destination && values.destination.value })
      .then(() => refetch())
      .then(() => {
        helpers.setSubmitting(false);
        helpers.resetForm();
        toast.success('Collection delete completed');

        dispatch({ type: 'deletionModal/close' });
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
          value={state.searchQuery}
          onChange={event => dispatch({ type: 'searchQuery/set', payload: event.target.value })}
        />
      </FirstRow>
      <SecondRow>
        <NewCollectionItemStyled
          onClick={onClickNewCollection}
          onSubmit={onSubmitNewCollection}
          isEditable={state.isCreating}
          value={state.newCollectionName}
          onChange={event => dispatch({ type: 'newCollectionName/set', payload: event.target.value })}
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
      {data && state.activeCollection ? (
        <>
          <EditCollectionModal
            isOpen={state.editModal}
            onRequestClose={() => dispatch({ type: 'editModal/close' })}
            refetch={refetch}
            collection={state.activeCollection}
          />
          <CollectionDeleteModal
            isOpen={state.deletionModal}
            onRequestClose={() => dispatch({ type: 'deletionModal/close' })}
            onSubmit={onSubmitDelete}
            activeCollection={state.activeCollection}
            collections={data}
          />
        </>
      ) : null}
    </CollectionsStyled>
  );
};

export default Collections;
