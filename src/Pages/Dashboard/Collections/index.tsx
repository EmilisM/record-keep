import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import CollectionsFilterCard from 'Organisms/Collections/CollectionsFilterCard';
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
  updateCollection as updateCollectionAPI,
  deleteCollection as deleteCollectionAPI,
} from 'API/Collection';
import Loader from 'Atoms/Loader/Loader';
import { toast } from 'react-toastify';
import EditCollectionModal from 'Molecules/Modal/EditCollectionModal';
import { ImageCreateModel } from 'Types/Image';
import { updateImage, createImage } from 'API/Image';
import CollectionDeleteModal from 'Organisms/Modal/CollectionDeleteModal';
import { Collection, CollectionDeleteFields } from 'Types/Collection';
import { FormikHelpers } from 'formik';

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

const CollectionsFilterCardStyled = styled(CollectionsFilterCard)`
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

  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const { data, status, refetch } = useQuery('collections', [nameSearch], (key, name) => getCollections(name));

  const [createCollection] = useMutation(createCollectionAPI, { throwOnError: true });
  const [mutateUpdateImage] = useMutation(updateImage);
  const [mutateCreateImage] = useMutation(createImage);
  const [updateCollection] = useMutation(updateCollectionAPI);
  const [deleteCollection] = useMutation(deleteCollectionAPI);

  useEffect(() => {
    refetch();
  }, [refetch, nameSearch]);

  const onClickNewCollection = (): void => {
    if (!isEditable) {
      setIsEditable(true);
    }
  };

  const onSubmitNewCollection = (): void => {
    if (newCollectionName) {
      createCollection({ name: newCollectionName }).then(() => {
        setNewCollectionName('');
        setIsEditable(false);
        toast.success('New collection created');
        refetch();
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

  const onImageSubmit = (imageData: ImageCreateModel): Promise<void> =>
    new Promise<void>(resolve => {
      if (!data || !activeCollection) {
        return resolve();
      }

      if (activeCollection.image?.id) {
        mutateUpdateImage({ ...imageData, id: activeCollection.image?.id }).then(() => {
          refetch();
          resolve();
        });
      } else {
        mutateCreateImage(imageData)
          .then(image =>
            updateCollection({
              id: activeCollection.id,
              operations: [{ op: 'add', path: '/imageId', value: image.id }],
            }),
          )
          .then(() => {
            refetch();
            resolve();
          });
      }
    });

  const onSubmitDelete = (values: CollectionDeleteFields, helpers: FormikHelpers<CollectionDeleteFields>): void => {
    if (!activeCollection) {
      return;
    }

    const id = activeCollection.id;

    deleteCollection({ id, destinationId: values.toCollection && values.toCollection.value }).then(() => {
      helpers.setSubmitting(false);
      helpers.resetForm();
      refetch();
      toast.success('Collection delete completed');
    });
  };

  return (
    <CollectionsStyled>
      <FirstRow>
        <CollectionsFilterCardStyled value={nameSearch} onChange={event => setNameSearch(event.target.value)} />
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
              subTitle={item.recordCount > 0 ? `${item.recordCount} record` : 'No records'}
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
            onImageSubmit={onImageSubmit}
            isOpen={editModalOpen}
            onRequestClose={() => setEditModalOpen(false)}
            collectionsRefetch={refetch}
            activeCollection={activeCollection}
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
