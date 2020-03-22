import React, { ReactElement } from 'react';

import CardWithHeader from 'Molecules/Card/CardWithHeader';
import InvisibleButton from 'Atoms/Button/InvisibleButton';
import { ReactComponent as Add } from 'Assets/Add.svg';
import styled from 'styled-components/macro';

type Props = {
  className?: string;
};

const AddStyled = styled(Add)`
  fill: ${props => props.theme.colors.text.primaryDarker};
  width: 25px;
`;

const InvisibleButtonStyled = styled(InvisibleButton)`
  margin: 0;
  padding: 0;
  display: flex;
`;

const ButtonLabel = styled.div`
  margin-left: 10px;
`;

const CollectionsActionCard = ({ className }: Props): ReactElement => (
  <CardWithHeader className={className} title="Actions">
    <InvisibleButtonStyled color="primaryDarker">
      <AddStyled />
      <ButtonLabel>Add</ButtonLabel>
    </InvisibleButtonStyled>
  </CardWithHeader>
);

export default CollectionsActionCard;
