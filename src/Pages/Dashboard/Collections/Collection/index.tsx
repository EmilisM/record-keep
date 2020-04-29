import React, { ReactElement, useEffect, useReducer } from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCollection } from 'API/Collection';
import { CollectionMatchParams } from 'Types/Collection';
import Loader from 'Atoms/Loader/Loader';
import { RecordCountCard } from 'Molecules/Card/RecordCountCard';
import CollectionInfoCard from 'Molecules/Card/CollectionInfoCard';
import { reducer, initialState } from 'State/Collection';
import { ActionMenuOption } from 'Types/ActionMenu';
import EditCollectionModal from 'Molecules/Modal/EditCollectionModal';
import { ImageCreateModel } from 'Types/Image';

const CollectionStyled = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ColumnFirst = styled.div`
  width: 33%;
`;

const ColumnSecond = styled.div`
  width: 66%;
  margin-left: 20px;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
`;

type Props = RouteComponentProps<CollectionMatchParams> & {
  setTitle: (newTitle: string) => void;
};

const Collection = ({ setTitle, match }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, status, refetch } = useQuery(['collection', match.params.collectionId], (key, id) => getCollection(id));

  useEffect(() => {
    if (data) {
      setTitle(`Collection ${data.name}`);
    }
  }, [data, setTitle]);

  const onActionMenuClick = (options: ActionMenuOption): void => {
    if (options.value === 'edit') {
      dispatch({ type: 'editModal/open' });
    }
  };

  const onImageSubmit = (data: ImageCreateModel): Promise<void> => new Promise(() => {});

  return (
    <CollectionStyled>
      {!data || status === 'loading' ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        [
          <ColumnFirst key="column-first">
            <CollectionInfoCard
              description={data.description}
              creationDate={data.creationDate}
              onActionMenuClick={onActionMenuClick}
            />
          </ColumnFirst>,
          <ColumnSecond key="column-second">
            <RecordCountCard count={data.recordCount} />
          </ColumnSecond>,
          <EditCollectionModal
            key="collection-modal"
            refetch={refetch}
            collection={data}
            isOpen={state.editModal}
            onRequestClose={() => dispatch({ type: 'editModal/close' })}
            onImageSubmit={onImageSubmit}
          />,
        ]
      )}
    </CollectionStyled>
  );
};

export default Collection;
