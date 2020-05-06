import React, { ReactElement, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { RecordMatchParams } from 'Types/Record';
import styled from 'styled-components/macro';
import { useQuery } from 'react-query';
import { getRecord } from 'API/Record';
import { isAxiosError } from 'Types/Error';
import { RouteConfig } from 'Routes/RouteConfig';
import Loader from 'Atoms/Loader/Loader';
import RecordInfoCard from 'Molecules/Card/RecordInfoCard';
import RecordImageCard from 'Molecules/Card/RecordImageCard';
import { ActionMenuOption } from 'Types/ActionMenu';

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
`;

const FirstColumn = styled.div`
  width: 100%;
`;

const SecondColumn = styled.div``;

type Props = RouteComponentProps<RecordMatchParams> & {
  setTitle: (value: string) => void;
};

const Record = ({ setTitle, match }: Props): ReactElement => {
  const { push } = useHistory();

  const onRecordError = (err: unknown): void => {
    if (isAxiosError(err) && err.response?.status === 404) {
      push(RouteConfig.Dashboard.NotFound);
    }
  };

  const { data: record, status: recordStatus } = useQuery(
    ['record', match.params.recordId],
    (key, id) => getRecord(id),
    {
      onError: onRecordError,
      retry: false,
    },
  );

  useEffect(() => {
    if (record) {
      setTitle(`Record ${record.name}`);
    }
  }, [record, setTitle]);

  const onActionMenuClick = (option: ActionMenuOption): void => {};

  if (!record || recordStatus === 'loading') {
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
        <RecordImageCard image={record.image?.data} />
      </SecondColumn>
    </RecordStyled>
  );
};

export default Record;
