import React, { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { RecordMatchParams, UpdateRecordModel } from 'Types/Record';
import styled from 'styled-components/macro';
import { useQuery, useMutation } from 'react-query';
import { getRecord, deleteRecord, updateRecord } from 'API/Record';
import { getCollection } from 'API/Collection';
import { isAxiosError } from 'Types/Error';
import { RouteConfig } from 'Routes/RouteConfig';
import Loader from 'Atoms/Loader/Loader';
import RecordInfoCard from 'Molecules/Card/RecordInfoCard';
import { ActionMenuOption } from 'Types/ActionMenu';
import RecordPartOfCollection from 'Molecules/Card/RecordPartOfCollection';
import CollectionItem from 'Molecules/Collection/CollectionItem';
import EditRecordModal from 'Organisms/Modal/EditRecordModal';
import DeletionModal from 'Organisms/Modal/DeletionModal';
import { toast } from 'react-toastify';
import RecordRatingCard from 'Molecules/Card/RecordRatingCard';

const RecordStyled = styled.div`
  display: flex;

  flex-direction: row;
  grid-gap: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
    grid-gap: 10px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
`;

const FirstColumn = styled.div`
  width: 33%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const SecondColumn = styled.div`
  width: 67%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const RecordRatingCardStyled = styled(RecordRatingCard)`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-top: 10px;
  }
`;

const CollectionItemStyled = styled(CollectionItem)`
  border-radius: 0 0 4px 4px;
`;

type Props = RouteComponentProps<RecordMatchParams> & {
  setTitle: (value: string) => void;
};

const Record = ({ setTitle, match }: Props): ReactElement => {
  const { push } = useHistory();
  const [editModal, setEditModal] = useState(false);
  const [deletionModal, setDeletionModal] = useState(false);
  const [mutateDeleteRecord] = useMutation(deleteRecord);
  const [mutateRecord] = useMutation(updateRecord);

  const onRecordError = (err: unknown): void => {
    if (isAxiosError(err) && err.response?.status === 404) {
      push(RouteConfig.Dashboard.NotFound);
    }
  };

  const { data: record, status: recordStatus, refetch } = useQuery(
    ['record', match.params.recordId],
    (key, id) => getRecord(id),
    {
      onError: onRecordError,
      retry: false,
    },
  );

  const { data: collection, status: collectionStatus } = useQuery(
    ['collection', record?.collectionId.toString() || ''],
    (key, id) => getCollection(id),
  );

  useEffect(() => {
    if (record) {
      setTitle(`Record ${record.name}`);
    }
  }, [record, setTitle]);

  const onActionMenuClick = (option: ActionMenuOption): void => {
    if (option.value === 'edit') {
      setEditModal(true);
    } else if (option.value === 'delete') {
      setDeletionModal(true);
    }
  };

  if (!record || recordStatus === 'loading' || !collection || collectionStatus === 'loading') {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  const onRecordDelete = (recordId: number, collectionId: number): void => {
    mutateDeleteRecord([recordId]).then(() => {
      toast.success('Record delete successful');
      push(`${RouteConfig.Dashboard.Collections.Root}/${collectionId}`);
    });
  };

  const onChange = (rating: number): void => {
    if (rating > 5 || rating < 1) {
      return;
    }

    const request: UpdateRecordModel = {
      id: record.id,
      operations: [
        {
          op: 'add',
          path: '/rating',
          value: rating,
        },
      ],
    };

    mutateRecord(request)
      .then(() => refetch())
      .then(() => {
        toast.success('Rating update complete');
      });
  };

  return (
    <RecordStyled>
      <FirstColumn>
        <RecordInfoCard record={record} onActionMenuClick={onActionMenuClick} />
      </FirstColumn>
      <SecondColumn>
        <RecordPartOfCollection />
        <CollectionItemStyled
          image={collection.image?.data}
          title={collection.name}
          subTitle={collection.description || ''}
          to={`${RouteConfig.Dashboard.Collections.Root}/${collection.id}`}
        />
        <RecordRatingCardStyled onChange={onChange} rating={record.rating || 0} />
      </SecondColumn>
      <EditRecordModal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        title="Edit record"
        recordsRefetch={refetch}
        record={record}
      />
      <DeletionModal
        isOpen={deletionModal}
        onRequestClose={() => setDeletionModal(false)}
        onConfirm={() => onRecordDelete(record.id, record.collectionId)}
        title={`Are you sure you want to delete ${record.name} by ${record.artist}`}
      />
    </RecordStyled>
  );
};

export default Record;
