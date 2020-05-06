import React, { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { RecordMatchParams } from 'Types/Record';
import styled from 'styled-components/macro';
import { useQuery } from 'react-query';
import { getRecord } from 'API/Record';
import { getCollection } from 'API/Collection';
import { isAxiosError } from 'Types/Error';
import { RouteConfig } from 'Routes/RouteConfig';
import Loader from 'Atoms/Loader/Loader';
import RecordInfoCard from 'Molecules/Card/RecordInfoCard';
import { ActionMenuOption } from 'Types/ActionMenu';
import RecordPartOfCollection from 'Molecules/Card/RecordPartOfCollection';
import CollectionItem from 'Molecules/Collection/CollectionItem';
import EditRecordModal from 'Organisms/Modal/EditRecordModal';

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

type Props = RouteComponentProps<RecordMatchParams> & {
  setTitle: (value: string) => void;
};

const Record = ({ setTitle, match }: Props): ReactElement => {
  const { push } = useHistory();
  const [editModal, setEditModal] = useState(false);

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
    }
  };

  if (!record || recordStatus === 'loading' || !collection || collectionStatus === 'loading') {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  return (
    <RecordStyled>
      <FirstColumn>
        <RecordInfoCard record={record} onActionMenuClick={onActionMenuClick} />
      </FirstColumn>
      <SecondColumn>
        <RecordPartOfCollection />
        <CollectionItem
          image={collection.image?.data}
          title={collection.name}
          subTitle={collection.description || collection.recordCount.toString()}
          to={`${RouteConfig.Dashboard.Collections.Root}/${collection.id}`}
        />
      </SecondColumn>
      <EditRecordModal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        title="Edit record"
        recordsRefetch={refetch}
        record={record}
      />
    </RecordStyled>
  );
};

export default Record;
