import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import moment from 'moment';
import ActionMenu from 'Organisms/ActionMenu';
import { ActionMenuOption } from 'Types/ActionMenu';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import P from 'Atoms/Text/P';
import { Record } from 'Types/Record';
import Image from 'Atoms/Image';
import { getDefaultResourceImage } from 'Services/image';
import { ReactComponent as Delete } from 'Assets/Add.svg';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 20px;

  display: flex;
  flex-direction: column;

  width: 100%;
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

const HStyled = styled(H)`
  margin-top: 10px;
`;

const ImageStyled = styled(Image)`
  width: 192px;
  height: 192px;
`;

const DeleteStyled = styled(Delete)`
  transform: rotateZ(45deg);
`;

const options: ActionMenuOption[] = [
  {
    value: 'edit',
    label: 'Edit',
    Icon: Edit,
  },
  {
    value: 'delete',
    label: 'Delete',
    Icon: DeleteStyled,
  },
];

type Props = {
  className?: string;
  onActionMenuClick: (options: ActionMenuOption) => void;
  record: Record;
};

const RecordInfoCard = ({ className, onActionMenuClick, record }: Props): ReactElement => (
  <CardStyled className={className}>
    <ActionMenuStyled onChange={onActionMenuClick} options={options} />
    <ImageStyled src={getDefaultResourceImage(record.image?.data)} />
    <HStyled fontWeight="light" color="primaryLight" fontSize="normal" level="2">
      Artist
    </HStyled>
    <P fontWeight="semiBold" color="primaryLight" fontSize="regular">
      {record.artist}
    </P>
    <HStyled fontWeight="light" color="primaryLight" fontSize="normal" level="2">
      Record name
    </HStyled>
    <P fontWeight="semiBold" color="primaryLight" fontSize="regular">
      {record.name}
    </P>
    <HStyled fontWeight="light" color="primaryLight" fontSize="normal" level="2">
      Record label
    </HStyled>
    <P fontWeight="semiBold" color="primaryLight" fontSize="regular">
      {record.label}
    </P>
    {record.description && [
      <HStyled key="description" fontWeight="light" color="primaryLight" fontSize="normal" level="2">
        Description
      </HStyled>,
      <P key="descriptionValue" fontWeight="semiBold" color="primaryLight" fontSize="regular">
        {record.description}
      </P>,
    ]}
    {record.recordLength && [
      <HStyled key="recordLength" fontWeight="light" color="primaryLight" fontSize="normal" level="2">
        Record length
      </HStyled>,
      <P key="recordLengthValue" fontWeight="semiBold" color="primaryLight" fontSize="regular">
        {record.recordLength}
      </P>,
    ]}
    <HStyled fontWeight="light" color="primaryLight" fontSize="normal" level="2">
      Production year
    </HStyled>
    <P fontWeight="semiBold" color="primaryLight" fontSize="regular">
      {moment(record.year).format('YYYY')}
    </P>
    <HStyled fontWeight="light" color="primaryLight" fontSize="normal" level="2">
      Record type
    </HStyled>
    <P fontWeight="semiBold" color="primaryLight" fontSize="regular">
      {record.recordType.name}
    </P>
    <HStyled fontWeight="light" color="primaryLight" fontSize="normal" level="2">
      Record format
    </HStyled>
    <P fontWeight="semiBold" color="primaryLight" fontSize="regular">
      {record.recordFormat.name}
    </P>
    {record.recordStyle[0] && [
      <HStyled key="genre" fontWeight="light" color="primaryLight" fontSize="normal" level="2">
        Genre
      </HStyled>,
      <P key="genreValue" fontWeight="semiBold" color="primaryLight" fontSize="regular">
        {record.recordStyle[0].style.genre.name}
      </P>,
    ]}
    <HStyled key="genre" fontWeight="light" color="primaryLight" fontSize="normal" level="2">
      Styles
    </HStyled>
    <P key="genreValue" fontWeight="semiBold" color="primaryLight" fontSize="regular">
      {record.recordStyle.map(style => style.style.name).join(', ')}
    </P>
    <HStyled fontWeight="light" color="primaryLight" fontSize="normal" level="2">
      Creation date
    </HStyled>
    <P fontWeight="semiBold" color="primaryLight" fontSize="regular">
      {moment(record.creationDate).format('YYYY-MM-DD')}
    </P>
  </CardStyled>
);

export default RecordInfoCard;
