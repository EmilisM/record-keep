import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import moment from 'moment';
import ActionMenu from 'Organisms/ActionMenu';
import { ActionMenuOption } from 'Types/ActionMenu';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import P from 'Atoms/Text/P';
import Image from 'Atoms/Image';
import { getDefaultResourceImage } from 'Services/image';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 20px;

  display: flex;
  flex-direction: column;

  width: 100%;
`;

const PStyled = styled(P)`
  margin: 0 0 20px;
`;

const ActionMenuStyled = styled(ActionMenu)`
  position: absolute;
  top: 20px;
  right: 20px;

  &:hover {
    background-color: ${props => props.theme.colors.background.secondaryDarkLighter};
  }

  .action-menu__icon {
    fill: ${props => props.theme.colors.text.primaryLight};
  }
`;

const ImageStyled = styled(Image)`
  width: 128px;
  height: 128px;

  margin-bottom: 10px;
`;

type Props = {
  className?: string;
  description?: string | null;
  image?: string;
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

const CollectionInfoCard = ({
  className,
  description,
  creationDate,
  onActionMenuClick,
  image,
}: Props): ReactElement => (
  <CardStyled className={className}>
    <ImageStyled src={getDefaultResourceImage(image)} />
    <ActionMenuStyled onChange={onActionMenuClick} options={options} />
    {description && [
      <H key="description" fontWeight="light" color="primaryLight" fontSize="normal" level="2">
        Description
      </H>,
      <PStyled key="description-value" fontWeight="semiBold" color="primaryLight" fontSize="regular">
        {description}
      </PStyled>,
    ]}
    <H fontWeight="light" color="primaryLight" fontSize="normal" level="2">
      Creation date
    </H>
    <P fontWeight="semiBold" color="primaryLight" fontSize="regular">
      {moment(creationDate).format('YYYY-MM-DD')}
    </P>
  </CardStyled>
);

export default CollectionInfoCard;
