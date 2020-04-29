import React, { ReactElement } from 'react';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import styled from 'styled-components/macro';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;

  width: 100%;
`;

type Props = {
  className?: string;
  count: number;
};

export const RecordCountCard = ({ className, count }: Props): ReactElement => (
  <CardStyled className={className}>
    <H fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
      Records
    </H>
    <H fontWeight="light" color="primaryLight" fontSize="regular" level="2">
      {count}
    </H>
  </CardStyled>
);
