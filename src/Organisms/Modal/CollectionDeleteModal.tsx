import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import InputLabel from 'Atoms/Input/InputLabel';
import Select from 'Molecules/Select/Select';
import { CollectionDeleteOption, Collection, CollectionDeleteFields } from 'Types/Collection';
import Modal from 'Atoms/Modal';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import { Formik, Form, FormikHelpers } from 'formik';

const DeletionModalStyled = styled(Modal)`
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    overflow: unset;
  }
`;

const Container = styled.div`
  margin-top: 10px;
`;

const ButtonDashboardStyled = styled(ButtonDashboard)`
  width: 100px;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  &:first-child {
    margin-right: 10px;
  }
`;

const Content = styled.div`
  display: flex;

  padding: 20px 0 0;
`;

const SelectStyled = styled(Select)`
  width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  border: 1px solid ${props => props.theme.colors.border.cardShadow};
  border-radius: 4px;
  margin-top: 10px;
`;

const deleteOptions: CollectionDeleteOption[] = [
  {
    label: 'Delete',
    value: 'delete',
  },
  {
    label: 'Move',
    value: 'move',
  },
];

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (values: CollectionDeleteFields, helpers: FormikHelpers<CollectionDeleteFields>) => void;
  activeCollection: Collection;
  collections: Collection[];
};

const CollectionDeleteModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  activeCollection,
  collections,
}: Props): ReactElement => {
  const collectionsMoveTo = collections
    .filter(c => c.id !== activeCollection.id)
    .map(c => ({ value: c.id.toString(), label: c.name }));

  const initialValues: CollectionDeleteFields = {
    delete: 'delete',
    toCollection: collectionsMoveTo[0],
  };

  return (
    <DeletionModalStyled
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={`Are you sure you want to delete collection ${activeCollection.name}?`}
    >
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {activeCollection.recordCount > 1 && (
              <Container>
                <InputLabel color="primaryDarker">What do you want to do with your records ?</InputLabel>
                <SelectStyled
                  placeholder="Select action"
                  options={deleteOptions}
                  isSearchable={false}
                  onChange={option => setFieldValue('delete', option.value)}
                  value={deleteOptions.find(o => o.value === values.delete)}
                />
                {values.delete === 'move' && (
                  <>
                    <InputLabel color="primaryDarker">To</InputLabel>
                    <SelectStyled
                      placeholder="Select collection"
                      options={collectionsMoveTo}
                      onChange={option => setFieldValue('toCollection', option)}
                      isSearchable={false}
                      value={values.toCollection}
                    />
                  </>
                )}
              </Container>
            )}
            <Content>
              <ButtonDashboardStyled disabled={isSubmitting} type="submit">
                Yes
              </ButtonDashboardStyled>
              <ButtonDashboardStyled disabled={isSubmitting} type="button" onClick={onRequestClose}>
                No
              </ButtonDashboardStyled>
            </Content>
          </Form>
        )}
      </Formik>
    </DeletionModalStyled>
  );
};

export default CollectionDeleteModal;
