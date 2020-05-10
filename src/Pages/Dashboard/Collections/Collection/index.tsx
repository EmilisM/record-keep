import React, { ReactElement, useEffect, useReducer, MouseEvent } from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getCollection, getCollections } from 'API/Collection';
import { CollectionMatchParams, CollectionDeleteFields } from 'Types/Collection';
import Loader from 'Atoms/Loader/Loader';
import { RecordCountCard } from 'Molecules/Card/RecordCountCard';
import CollectionInfoCard from 'Molecules/Card/CollectionInfoCard';
import { reducer, initialState } from 'State/Collection';
import { ActionMenuOption } from 'Types/ActionMenu';
import EditCollectionModal from 'Organisms/Modal/EditCollectionModal';
import RecordItem from 'Molecules/Record/RecordItem';
import { ReactComponent as Delete } from 'Assets/Add.svg';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import { ReactComponent as Select } from 'Assets/Select.svg';
import { RouteConfig } from 'Routes/RouteConfig';
import { getRecords, deleteRecord as deleteRecordAPI } from 'API/Record';
import { deleteCollection as deleteCollectionAPI } from 'API/Collection';
import NewRecorditem from 'Molecules/Record/NewRecordItem';
import NewRecordModal from 'Organisms/Modal/NewRecordModal';
import DeletionModal from 'Organisms/Modal/DeletionModal';
import { Record } from 'Types/Record';
import { toast } from 'react-toastify';
import EditRecordModal from 'Organisms/Modal/EditRecordModal';
import { isAxiosError } from 'Types/Error';
import { getGenres } from 'API/Genre';
import LinkToAnalysisCard from 'Molecules/Card/LinkToAnalysisCard';
import CollectionDeleteModal from 'Organisms/Modal/CollectionDeleteModal';
import { FormikHelpers } from 'formik';
import { isEmpty } from 'lodash';

const CollectionStyled = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;

  grid-gap: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
    grid-gap: 10px;
  }
`;

const ColumnFirst = styled.div`
  width: 33%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    position: unset;
  }
`;

const ColumnSecond = styled.div`
  width: 66%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
`;

const DeleteStyled = styled(Delete)`
  transform: rotateZ(45deg);
`;

const RecordItemStyled = styled(RecordItem)`
  margin-top: 10px;
`;

const NewRecorditemStyled = styled(NewRecorditem)`
  margin: 20px 0;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin: 10px 0;
  }
`;

const LinkToAnalysisCardStyled = styled(LinkToAnalysisCard)`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-top: 10px;
  }
`;

type Props = RouteComponentProps<CollectionMatchParams> & {
  setTitle: (newTitle: string) => void;
};

const Collection = ({ setTitle, match }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { push } = useHistory();

  const onCollectionError = (err: unknown): void => {
    if (isAxiosError(err) && err.response?.status === 404) {
      push(RouteConfig.Dashboard.NotFound);
    }
  };

  const { data: collectionData, status: collectionStatus, refetch: collectionRefetch } = useQuery(
    ['collection', match.params.collectionId],
    (key, collectionId) => getCollection(collectionId),
    {
      onError: onCollectionError,
      retry: false,
    },
  );

  const { data: recordsData, status: recordsStatus, refetch: recordsRefetch } = useQuery(
    ['records', match.params.collectionId],
    (key, collectionId) => getRecords(collectionId),
  );

  const { data: genres, status: genreStatus } = useQuery('genres', getGenres);
  const { data: collections, status: collectionsStatus } = useQuery('collections', () => getCollections());

  const [deleteRecord] = useMutation(deleteRecordAPI);
  const [deleteCollection] = useMutation(deleteCollectionAPI);

  useEffect(() => {
    if (collectionData) {
      setTitle(`Collection ${collectionData.name}`);
    }
  }, [collectionData, setTitle]);

  const onCollectionActionClick = (options: ActionMenuOption): void => {
    if (options.value === 'edit') {
      dispatch({ type: 'editModal/open' });
    } else if (options.value === 'delete') {
      dispatch({ type: 'collectionDeleteModal/open' });
    }
  };

  const onChange = (options: ActionMenuOption, activeRecord: Record): void => {
    if (options.value === 'delete') {
      dispatch({ type: 'activeRecord/set', payload: activeRecord });
      dispatch({ type: 'selectedRecords/clear' });
      dispatch({ type: 'deletionModal/open' });
    } else if (options.value === 'edit') {
      dispatch({ type: 'activeRecord/set', payload: activeRecord });
      dispatch({ type: 'selectedRecords/clear' });
      dispatch({ type: 'editRecordModal/open' });
    } else if (options.value === 'select' && state.selectedRecords[activeRecord.id]) {
      dispatch({ type: 'selectedRecords/remove', payload: activeRecord.id });
    } else if (options.value === 'select' && !state.selectedRecords[activeRecord.id]) {
      dispatch({ type: 'selectedRecords/add', payload: activeRecord.id });
    }
  };

  const onConfirmDelete = (): void => {
    if (!state.activeRecord) {
      return;
    }

    deleteRecord([state.activeRecord.id])
      .then(() => recordsRefetch())
      .then(() => {
        dispatch({ type: 'deletionModal/close' });
        toast.success('Record deletion completed');
      });
  };

  if (
    !collectionData ||
    collectionStatus === 'loading' ||
    !recordsData ||
    recordsStatus === 'loading' ||
    !genres ||
    genreStatus === 'loading' ||
    !collections ||
    collectionsStatus === 'loading'
  ) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  const getAccountMenuOptions = (recordId: number): ActionMenuOption[] => {
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
      {
        value: 'select',
        label: state.selectedRecords[recordId] ? 'Deselect' : 'Select',
        Icon: Select,
      },
    ];

    return accountMenuOptions;
  };

  const onCollectionDeleteSubmit = (
    values: CollectionDeleteFields,
    helpers: FormikHelpers<CollectionDeleteFields>,
  ): void => {
    const destinationId = values.action === 'move' ? values.destination.value : undefined;

    deleteCollection({ id: collectionData.id, destinationId }).then(() => {
      helpers.setSubmitting(false);
      toast.success('Collection delete completed');
      push(RouteConfig.Dashboard.Collections.Root);
    });
  };

  const onClickRecordItem = (e: MouseEvent<HTMLAnchorElement>, recordId: number): void => {
    if (isEmpty(state.selectedRecords)) {
      return;
    }

    e.preventDefault();

    if (state.selectedRecords[recordId]) {
      dispatch({ type: 'selectedRecords/remove', payload: recordId });
    } else {
      dispatch({ type: 'selectedRecords/add', payload: recordId });
    }
  };

  const onConfirmAllDelete = (): void => {
    if (isEmpty(state.selectedRecords)) {
      return;
    }

    deleteRecord([...Object.keys(state.selectedRecords)])
      .then(() => recordsRefetch())
      .then(() => {
        dispatch({ type: 'selectedRecords/clear' });
        dispatch({ type: 'deleteAllModal/close' });
        toast.success('Record deletion completed');
      });
  };

  return (
    <CollectionStyled>
      <ColumnFirst>
        <StickyContainer>
          <CollectionInfoCard
            image={collectionData.image?.data}
            description={collectionData.description}
            creationDate={collectionData.creationDate}
            onActionMenuClick={onCollectionActionClick}
          />
          <LinkToAnalysisCardStyled collectionId={match.params.collectionId} />
        </StickyContainer>
      </ColumnFirst>
      <ColumnSecond>
        <RecordCountCard
          onDeleteSelected={() => dispatch({ type: 'deleteAllModal/open' })}
          selectedCount={Object.keys(state.selectedRecords).length}
          count={collectionData.recordCount}
        />
        <NewRecorditemStyled onClick={() => dispatch({ type: 'newRecordModal/open' })} />
        {recordsData.map(record => (
          <RecordItemStyled
            key={record.id}
            to={`${RouteConfig.Dashboard.Records.Root}/${record.id}`}
            accountMenuOptions={getAccountMenuOptions(record.id)}
            accountMenuOnChange={option => onChange(option, record)}
            record={record}
            isSelected={state.selectedRecords[record.id]}
            onClick={e => onClickRecordItem(e, record.id)}
          />
        ))}
      </ColumnSecond>
      <EditCollectionModal
        refetch={collectionRefetch}
        collection={collectionData}
        isOpen={state.editModal}
        onRequestClose={() => dispatch({ type: 'editModal/close' })}
      />
      <NewRecordModal
        isOpen={state.newRecordModal}
        onRequestClose={() => dispatch({ type: 'newRecordModal/close' })}
        recordsRefetch={recordsRefetch}
        collectionRefetch={collectionRefetch}
        collectionId={collectionData.id}
      />
      <CollectionDeleteModal
        activeCollection={collectionData}
        isOpen={state.collectionDeleteModal}
        onRequestClose={() => dispatch({ type: 'collectionDeleteModal/close' })}
        collections={collections}
        onSubmit={onCollectionDeleteSubmit}
      />
      {!isEmpty(state.selectedRecords) && (
        <DeletionModal
          key="deletionModal"
          title={`Are you sure you want to delete ${Object.keys(state.selectedRecords).length} ${
            Object.keys(state.selectedRecords).length > 1 ? 'records' : 'record'
          } ?`}
          isOpen={state.deleteAllModal}
          onRequestClose={() => dispatch({ type: 'deleteAllModal/close' })}
          onConfirm={onConfirmAllDelete}
        />
      )}
      {state.activeRecord && [
        <DeletionModal
          key="deletionModal"
          title={`Are you sure you want to delete ${state.activeRecord.name} by ${state.activeRecord.artist}`}
          isOpen={state.deletionModal}
          onRequestClose={() => dispatch({ type: 'deletionModal/close' })}
          onConfirm={onConfirmDelete}
        />,
        <EditRecordModal
          key="editRecordModal"
          title="Edit record"
          isOpen={state.editRecordModal}
          onRequestClose={() => dispatch({ type: 'editRecordModal/close' })}
          recordsRefetch={recordsRefetch}
          record={state.activeRecord}
        />,
      ]}
    </CollectionStyled>
  );
};

export default Collection;
