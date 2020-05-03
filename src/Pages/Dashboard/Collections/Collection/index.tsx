import React, { ReactElement, useEffect, useReducer } from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getCollection, updateCollection } from 'API/Collection';
import { CollectionMatchParams } from 'Types/Collection';
import Loader from 'Atoms/Loader/Loader';
import { RecordCountCard } from 'Molecules/Card/RecordCountCard';
import CollectionInfoCard from 'Molecules/Card/CollectionInfoCard';
import { reducer, initialState } from 'State/Collection';
import { ActionMenuOption } from 'Types/ActionMenu';
import EditCollectionModal from 'Organisms/Modal/EditCollectionModal';
import { ImageCreateModel } from 'Types/Image';
import RecordItem from 'Molecules/Record/RecordItem';
import { ReactComponent as Delete } from 'Assets/Add.svg';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import { RouteConfig } from 'Routes/RouteConfig';
import { updateImage, createImage } from 'API/Image';
import { getRecords } from 'API/Record';
import NewRecorditem from 'Molecules/Record/NewRecordItem';
import NewRecordModal from 'Organisms/Modal/NewRecordModal';

const CollectionStyled = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
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
  margin: 0 0 0 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
    margin: 20px 0 0 0;
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
  const { data: collectionData, status: collectionStatus, refetch: collectionRefetch } = useQuery(
    ['collection', match.params.collectionId],
    (key, collectionId) => getCollection(collectionId),
  );
  const { data: recordsData, status: recordsStatus, refetch: recordsRefetch } = useQuery(
    ['records', match.params.collectionId],
    (key, collectionId) => getRecords(collectionId),
  );

  const [mutateUpdateImage] = useMutation(updateImage);
  const [mutateCreateImage] = useMutation(createImage);
  const [mutateCollection] = useMutation(updateCollection);

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

  const onCollectionImageSubmit = (createModel: ImageCreateModel): Promise<void> =>
    new Promise(resolve => {
      if (!collectionData) {
        return resolve();
      }

      if (collectionData?.image?.id) {
        mutateUpdateImage({ ...createModel, id: collectionData.image.id }).then(() => {
          collectionRefetch();
          resolve();
        });
      } else {
        mutateCreateImage(createModel)
          .then(image =>
            mutateCollection({
              id: collectionData.id,
              operations: [{ op: 'add', path: '/imageId', value: image.id }],
            }),
          )
          .then(() => {
            collectionRefetch();
            resolve();
          });
      }
    });

  const onChange = (options: ActionMenuOption): void => {};

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
                to={RouteConfig.Dashboard.Collections.Root}
                accountMenuOptions={accountMenuOptions}
                accountMenuOnChange={onChange}
                record={record}
              />
            ))}
          </ColumnSecond>
          <EditCollectionModal
            refetch={collectionRefetch}
            collection={collectionData}
            isOpen={state.editModal}
            onRequestClose={() => dispatch({ type: 'editModal/close' })}
            onImageSubmit={onCollectionImageSubmit}
          />
          <NewRecordModal
            isOpen={state.newRecordModal}
            onRequestClose={() => dispatch({ type: 'newRecordModal/close' })}
            recordsRefetch={recordsRefetch}
            collectionId={collectionData.id}
          />
        </>
      )}
    </CollectionStyled>
  );
};

export default Collection;
