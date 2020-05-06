import React, { ReactElement } from 'react';
import Card from 'Atoms/Card/Card';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';

const CardStyled = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

type Props = {
  className?: string;
};

const RecordPartOfCollection = ({ className }: Props): ReactElement => (
  <CardStyled className={className}>
    <H level="2" color="primaryDarker" fontSize="normal" fontWeight="semiBold">
      Part of collection
    </H>
  </CardStyled>
);

export default RecordPartOfCollection;
