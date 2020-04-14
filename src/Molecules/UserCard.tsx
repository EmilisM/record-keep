import React, { ReactElement, useState } from 'react';
import UserIcon from 'Assets/User.png';
import Card from 'Atoms/Card/Card';
import styled from 'styled-components/macro';
import ActionMenu from 'Organisms/ActionMenu';
import { ActionMenuOption } from 'Types/ActionMenu';
import { ReactComponent as Edit } from 'Assets/Edit.svg';

type Props = {
  className?: string;
};

const CardStyled = styled(Card)`
  max-width: 400px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

const CardHeader = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 4px 4px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(
    to right,
    ${props => props.theme.colors.background.secondaryDark},
    ${props => props.theme.colors.background.secondaryDarkest}
  );
  position: absolute;
  top: 0px;
`;

const UserImageStyled = styled.img`
  width: 128px;
  height: 128px;

  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.border.primary};
`;

const ActionMenuStyled = styled(ActionMenu)<{ isOpen: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;

  background-color: ${props => props.isOpen && props.theme.colors.background.secondaryDarkLighter};

  &:hover {
    background-color: ${props => props.theme.colors.background.secondaryDarkLighter};
  }

  .action-menu__icon {
    fill: ${props => props.theme.colors.text.primaryLight};
  }
`;

const actionMenuOptions: ActionMenuOption[] = [
  {
    value: 'edit',
    label: 'Edit',
    Icon: Edit,
  },
];

const UserCard = ({ className }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (): void => {};

  return (
    <CardStyled className={className}>
      <CardHeader>
        <UserImageStyled src={UserIcon} />
        <ActionMenuStyled
          options={actionMenuOptions}
          onChange={onChange}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </CardHeader>
    </CardStyled>
  );
};

export default UserCard;
