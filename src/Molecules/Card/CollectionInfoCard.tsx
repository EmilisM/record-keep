import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import moment from 'moment';
import ActionMenu from 'Organisms/ActionMenu';
import { ActionMenuOption } from 'Types/ActionMenu';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import P from 'Atoms/Text/P';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 10px 20px;

  display: flex;
  flex-direction: column;

  width: 100%;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PStyled = styled(P)`
  margin: 0 0 20px;
`;

const ActionMenuStyled = styled(ActionMenu)`
  &:hover {
    background-color: ${props => props.theme.colors.background.secondaryDarkLighter};
  }

  .action-menu__icon {
    fill: ${props => props.theme.colors.text.primaryLight};
  }
`;

type Props = {
  className?: string;
  description?: string | null;
  creationDate: Date;
  onActionMenuClick: (options: ActionMenuOption) => void;
};

const options: ActionMenuOption[] = [
  {
    value: 'edit',
    label: 'Edit',
    Icon: Edit,
  },
];

const CollectionInfoCard = ({ className, description, creationDate, onActionMenuClick }: Props): ReactElement => (
  <CardStyled className={className}>
    {description && [
      <DescriptionContainer key="description">
        <H fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
          Description
        </H>
        <ActionMenuStyled onChange={onActionMenuClick} options={options} />
      </DescriptionContainer>,
      <PStyled key="description-value" fontWeight="light" color="primaryLight" fontSize="regular">
        {description}
      </PStyled>,
    ]}
    <H fontWeight="semiBold" color="primaryLight" fontSize="regular" level="2">
      Creation date
    </H>
    <P fontWeight="light" color="primaryLight" fontSize="regular">
      {moment(creationDate).format('YYYY-MM-DD')}
    </P>
  </CardStyled>
);

export default CollectionInfoCard;
