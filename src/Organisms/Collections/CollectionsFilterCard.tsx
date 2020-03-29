import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import InputDashboard from 'Atoms/Input/InputDashboard';
import Card from 'Atoms/Card/Card';
import InputLabel from 'Atoms/Input/InputLabel';

type Props = {
  className?: string;
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardStyled = styled(Card)`
  width: 100%;

  padding: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 15px 10px;
  }
`;

const InputDashboardStyled = styled(InputDashboard)`
  margin-top: 10px;
`;

const CollectionsFilterCard = ({ className }: Props): ReactElement => (
  <CardStyled className={className}>
    <Column>
      <InputLabel color="primaryDarker" fontSize="big" fontWeight="semiBold">
        Search
      </InputLabel>
      <InputDashboardStyled placeholder="Record name" color="primaryDarker" fontWeight="regular" fontSize="regular" />
    </Column>
  </CardStyled>
);

export default CollectionsFilterCard;
