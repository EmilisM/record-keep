import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import Select from 'Molecules/Select/Select';
import { SelectOption } from 'Types/Select';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
`;

const SelectStyled = styled(Select)`
  margin-left: auto;
  min-width: 200px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: auto;
    min-width: 150px;
  }
`;

type Props = {
  className?: string;
  onChangeCollection: (option: SelectOption) => void;
  collections: SelectOption[];
  value: SelectOption;
};

const CollectionSelectedCard = ({ className, onChangeCollection, collections, value }: Props): ReactElement => (
  <CardStyled className={className}>
    <H fontWeight="semiBold" color="primaryLight" fontSize="normal" level="2">
      Selected collection
    </H>
    <SelectStyled options={collections} onChange={onChangeCollection} value={value} />
  </CardStyled>
);

export default CollectionSelectedCard;
