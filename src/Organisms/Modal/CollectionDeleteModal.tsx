import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import InputLabel from 'Atoms/Input/InputLabel';
import Select from 'Molecules/Select/Select';
import { CollectionDeleteOption, Collection, CollectionDeleteFields } from 'Types/Collection';
import Modal from 'Atoms/Modal';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import { Formik, Form, FormikHelpers } from 'formik';
import { ReactComponent as CollectionIcon } from 'Assets/Collections.svg';

const Container = styled.div`
  margin-top: 10px;
`;

const ButtonDashboardStyled = styled(ButtonDashboard)`
  width: 150px;
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

const InputLabelStyled = styled(InputLabel)`
  display: block;
  margin-top: 10px;
`;

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
  const destinationCollections = collections
    .filter(c => c.id !== activeCollection.id)
    .map(c => ({ value: c.id.toString(), label: c.name }));

  const initialValues: CollectionDeleteFields = {
    action: 'delete',
    destination: destinationCollections[0],
  };

  const deleteOptions: CollectionDeleteOption[] = [
    {
      label: 'Delete',
      value: 'delete',
    },
  ];

  if (destinationCollections.length > 0) {
    deleteOptions.push({
      label: 'Move',
      value: 'move',
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={`Are you sure you want to delete collection ${activeCollection.name}?`}
      Icon={CollectionIcon}
    >
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {activeCollection.recordCount > 0 && (
              <Container>
                <InputLabel color="primaryDarker">What do you want to do with your records ?</InputLabel>
                <SelectStyled
                  placeholder="Select action"
                  options={deleteOptions}
                  isSearchable={false}
                  onChange={option => setFieldValue('action', option.value)}
                  value={deleteOptions.find(o => o.value === values.action)}
                />
                {values.action === 'move' && [
                  <InputLabelStyled key="destinationLabel" color="primaryDarker">
                    to
                  </InputLabelStyled>,
                  <SelectStyled
                    key="destinationSelect"
                    placeholder="Select collection"
                    options={destinationCollections}
                    onChange={option => setFieldValue('destination', option)}
                    isSearchable={false}
                    value={values.destination}
                  />,
                ]}
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
    </Modal>
  );
};

export default CollectionDeleteModal;
