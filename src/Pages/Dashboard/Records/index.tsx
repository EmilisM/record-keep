import React, { ReactElement, useReducer } from 'react';
import styled from 'styled-components/macro';
import FilterCard from 'Molecules/Card/FilterCard';
import { initialState, reducer } from 'State/Records';
import RecordItem from 'Molecules/Record/RecordItem';
import { useQuery, useMutation } from 'react-query';
import { getRecords } from 'API/Record';
import Loader from 'Atoms/Loader/Loader';
import { RouteConfig } from 'Routes/RouteConfig';
import { ReactComponent as Delete } from 'Assets/Add.svg';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import { ActionMenuOption } from 'Types/ActionMenu';
import useDebounce from 'Services/Hooks/useDebounce';
import DeletionModal from 'Organisms/Modal/DeletionModal';
import { deleteRecord } from 'API/Record';
import { Record } from 'Types/Record';
import { toast } from 'react-toastify';
import EditRecordModal from 'Organisms/Modal/EditRecordModal';

const RecordsStyled = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap-reverse;
  }
`;

const RecordRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 10px;
    flex-wrap: wrap-reverse;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 20px;
`;

const RecordItemStyled = styled(RecordItem)`
  &:not(:first-child) {
    margin-top: 10px;
  }

  .record-item__image {
    width: 64px;
    height: 64px;
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
    Icon: Delete,
  },
];

const Records = (): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debouncedSearchQuery = useDebounce(state.searchQuery, 300);
  const { data, refetch } = useQuery(['records', debouncedSearchQuery], (key, query) => getRecords(undefined, query));

  const [mutateDeleteRecord] = useMutation(deleteRecord);

  const { activeRecord } = state;

  const optionsOnChange = (option: ActionMenuOption, index: number): void => {
    if (!data) {
      return;
    }

    dispatch({ type: 'activeRecord/set', payload: data[index] });

    if (option.value === 'delete') {
      dispatch({ type: 'deleteModal/open' });
    } else if (option.value === 'edit') {
      dispatch({ type: 'editModal/open' });
    }
  };

  const onRecordDelete = (record: Record): void => {
    mutateDeleteRecord(record.id)
      .then(() => refetch())
      .then(() => {
        dispatch({ type: 'deleteModal/close' });
        toast.success('Record delete successful');
      });
  };

  return (
    <RecordsStyled>
      <Row>
        <FilterCard
          label="Search for records"
          placeholder="Search query"
          value={state.searchQuery}
          onChange={e => dispatch({ type: 'searchQuery/set', payload: e.target.value })}
        />
      </Row>
      <RecordRow>
        {data ? (
          data.map((d, index) => (
            <RecordItemStyled
              accountMenuOnChange={option => optionsOnChange(option, index)}
              accountMenuOptions={accountMenuOptions}
              key={d.id}
              record={d}
              to={`${RouteConfig.Dashboard.Records.Root}/${d.id}`}
            />
          ))
        ) : (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}
      </RecordRow>
      {activeRecord && [
        <DeletionModal
          key="deletionModal"
          isOpen={state.deleteModal}
          onRequestClose={() => dispatch({ type: 'deleteModal/close' })}
          onConfirm={() => onRecordDelete(activeRecord)}
          title={`Are you sure you want to delete ${activeRecord.name} by ${activeRecord.artist}`}
        />,
        <EditRecordModal
          key="editRecordModal"
          record={activeRecord}
          recordsRefetch={refetch}
          title="Edit record"
          isOpen={state.editModal}
          onRequestClose={() => dispatch({ type: 'editModal/close' })}
        />,
      ]}
    </RecordsStyled>
  );
};

export default Records;
