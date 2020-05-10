import React, { ReactElement } from 'react';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import styled from 'styled-components/macro';
import InvisibleButton from 'Atoms/Button/InvisibleButton';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 10px 20px;

  display: inline-flex;

  width: 100%;
`;

const HStyled = styled(H)`
  margin-left: auto;
`;

const ButtonStyled = styled(InvisibleButton)`
  margin: 0 0 0 auto;

  &:hover {
    opacity: 0.6;
  }

  transition: all 300ms ease;
`;

type Props = {
  className?: string;
  selectedCount: number;
  count: number;
  onDeleteSelected: () => void;
};

export const RecordCountCard = ({ className, count, selectedCount, onDeleteSelected }: Props): ReactElement => (
  <CardStyled className={className}>
    {selectedCount > 0
      ? [
          <H key="recordText" fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
            Records selected
          </H>,
          <HStyled key="count" fontWeight="light" color="primaryLight" fontSize="regular" level="2">
            <ButtonStyled onClick={onDeleteSelected} key="deleteAll" color="primaryLight" fontWeight="light">
              Delete all
            </ButtonStyled>
            {` - ${selectedCount}/${count}`}
          </HStyled>,
        ]
      : [
          <H key="recordText" fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
            Records
          </H>,
          <HStyled key="count" fontWeight="light" color="primaryLight" fontSize="regular" level="2">
            {count}
          </HStyled>,
        ]}
  </CardStyled>
);
