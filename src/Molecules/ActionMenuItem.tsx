import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import { ActionMenuOption } from 'Types/ActionMenu';
import Span from 'Atoms/Text/Span';

type Props = {
  className?: string;
  option: ActionMenuOption;
  onClick: () => void;
};

const ActionMenuItemStyled = styled.li`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 4px;

  padding: 0 10px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: ${props => props.theme.colors.background.primaryDarker};
  }
`;

const Label = styled(Span)`
  margin-left: 10px;
`;

const ActionMenuItem = ({ className, option, onClick }: Props): ReactElement => (
  <ActionMenuItemStyled className={className} onClick={onClick}>
    <option.Icon />
    <Label fontSize="regular" color="primaryDarker">
      {option.label}
    </Label>
  </ActionMenuItemStyled>
);

export default ActionMenuItem;
