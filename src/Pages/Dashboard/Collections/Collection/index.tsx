import React, { ReactElement, useEffect, useReducer } from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getCollection } from 'API/Collection';
import { CollectionMatchParams } from 'Types/Collection';
import Loader from 'Atoms/Loader/Loader';
import { RecordCountCard } from 'Molecules/Card/RecordCountCard';
import CollectionInfoCard from 'Molecules/Card/CollectionInfoCard';
import { reducer, initialState } from 'State/Collection';
import { ActionMenuOption } from 'Types/ActionMenu';
import EditCollectionModal from 'Organisms/Modal/EditCollectionModal';
import RecordItem from 'Molecules/Record/RecordItem';
import { ReactComponent as Delete } from 'Assets/Add.svg';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import { RouteConfig } from 'Routes/RouteConfig';
import { getRecords, deleteRecord as deleteRecordAPI } from 'API/Record';
import NewRecorditem from 'Molecules/Record/NewRecordItem';
import NewRecordModal from 'Organisms/Modal/NewRecordModal';
import DeletionModal from 'Organisms/Modal/DeletionModal';
import { Record } from 'Types/Record';
import { toast } from 'react-toastify';
import EditRecordModal from 'Organisms/Modal/EditRecordModal';
import { isAxiosError } from 'Types/Error';

const CollectionStyled = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

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
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-top: 10px;
  }
`;

const NewRecorditemStyled = styled(NewRecorditem)`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-top: 10px;
  }
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

  const [deleteRecord] = useMutation(deleteRecordAPI);

  useEffect(() => {
    if (collectionData) {
      setTitle(`Collection ${collectionData.name}`);
    }
  }, [collectionData, setTitle]);

  const onCollectionActionClick = (options: ActionMenuOption): void => {
    if (options.value === 'edit') {
      dispatch({ type: 'editModal/open' });
    }
  };

  const onChange = (options: ActionMenuOption, activeRecord: Record): void => {
    dispatch({ type: 'activeRecord/set', payload: activeRecord });

    if (options.value === 'delete') {
      dispatch({ type: 'deletionModal/open' });
    } else if (options.value === 'edit') {
      dispatch({ type: 'editRecordModal/open' });
    }
  };

  const onConfirmDelete = (): void => {
    if (!state.activeRecord) {
      return;
    }

    deleteRecord(state.activeRecord.id).then(() => {
      recordsRefetch();
      dispatch({ type: 'deletionModal/close' });
      toast.success('Record delete complete');
    });
  };

  return (
    <CollectionStyled>
      {!collectionData || collectionStatus === 'loading' || !recordsData || recordsStatus === 'loading' ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <>
          <ColumnFirst>
            <CollectionInfoCard
              image={collectionData.image?.data}
              description={collectionData.description}
              creationDate={collectionData.creationDate}
              onActionMenuClick={onCollectionActionClick}
            />
          </ColumnFirst>
          <ColumnSecond>
            <RecordCountCard count={collectionData.recordCount} />
            <NewRecorditemStyled onClick={() => dispatch({ type: 'newRecordModal/open' })} />
            {recordsData.map(record => (
              <RecordItemStyled
                key={record.id}
                to={`${RouteConfig.Dashboard.Records.Root}/${record.id}`}
                accountMenuOptions={accountMenuOptions}
                accountMenuOnChange={option => onChange(option, record)}
                record={record}
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
            collectionId={collectionData.id}
          />
          {state.activeRecord && (
            <>
              <DeletionModal
                title={`Are you sure you want to delete ${state.activeRecord.name} by ${state.activeRecord.artist}`}
                isOpen={state.deletionModal}
                onRequestClose={() => dispatch({ type: 'deletionModal/close' })}
                onConfirm={onConfirmDelete}
              />
              <EditRecordModal
                title={`Edit ${state.activeRecord.name} by ${state.activeRecord.artist}`}
                isOpen={state.editRecordModal}
                onRequestClose={() => dispatch({ type: 'editRecordModal/close' })}
                recordsRefetch={recordsRefetch}
                record={state.activeRecord}
              />
            </>
          )}
        </>
      )}
    </CollectionStyled>
  );
};

export default Collection;
