import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import moment from 'moment';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 10px 20px;

  display: flex;
  flex-direction: column;

  width: 100%;
`;

const HStyled = styled(H)`
  margin: 0 0 20px;
`;

type Props = {
  className?: string;
  description?: string | null;
  creationDate: Date;
};

const CollectionInfoCard = ({ className, description, creationDate }: Props): ReactElement => (
  <CardStyled className={className}>
    {description && [
      <H key="description" fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
        Description
      </H>,
      <HStyled key="description-value" fontWeight="light" color="primaryLight" fontSize="regular" level="2">
        {description}
      </HStyled>,
    ]}
    <H fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
      Creation date
    </H>
    <H fontWeight="light" color="primaryLight" fontSize="regular" level="2">
      {moment(creationDate).format('YYYY-MM-DD')}
    </H>
  </CardStyled>
);

export default CollectionInfoCard;
