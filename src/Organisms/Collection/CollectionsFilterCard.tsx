import React, { ReactElement } from 'react';
import CardWithHeader from 'Molecules/Card/CardWithHeader';
import styled from 'styled-components/macro';

type Props = {
  className?: string;
};

const CardWithHeaderStyled = styled(CardWithHeader)`
  width: 100%;
`;

const CollectionsFilterCard = ({ className }: Props): ReactElement => (
  <CardWithHeaderStyled className={className} title="Search">
    Tools
  </CardWithHeaderStyled>
);

export default CollectionsFilterCard;
