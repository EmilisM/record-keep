import React, { ReactElement, useState, MouseEvent } from 'react';
import styled from 'styled-components/macro';
import ActionMenuItem from 'Molecules/ActionMenuItem';
import { ActionMenuOption } from 'Types/ActionMenu';
import { ReactComponent as Dots } from 'Assets/Dots.svg';

const DotsStyled = styled(Dots)`
  width: 100%;
  height: 100%;

  fill: ${props => props.theme.colors.text.primaryDarker};
`;

const ActionMenuIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 10px;
  max-width: 48px;

  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 38px;
    padding: 0 5px;
  }

  &[data-open='true'] {
    background-color: ${props => props.theme.colors.border.cardShadow};
  }

  &:hover {
    background-color: ${props => props.theme.colors.border.cardShadow};
  }

  transition: 300ms background-color ease;
`;

const ActionMenuStyled = styled.div`
  position: absolute;
  top: 28px;
  right: 0;

  border-radius: 4px;
  background-color: ${props => props.theme.colors.background.primary};
  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};
  z-index: 100;

  min-width: 150px;
`;

const ActionMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.text.primaryDarker};
  list-style: none;

  margin: 0;
  padding: 0;
`;

type Props = {
  className?: string;
  onChange: (option: ActionMenuOption) => void;
  options: ActionMenuOption[];
};

const ActionMenu = ({ className, options, onChange }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeWrapper = (option: ActionMenuOption): void => {
    onChange(option);
    setIsOpen(false);
  };

  const onClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    setIsOpen(!isOpen);
  };

  return (
    <ActionMenuIconContainer className={className} onClick={onClick} data-open={isOpen}>
      <DotsStyled className="action-menu__icon" />
      {isOpen && (
        <ActionMenuStyled>
          <ActionMenuItems>
            {options.map(option => (
              <ActionMenuItem key={option.value} onClick={() => onChangeWrapper(option)} option={option} />
            ))}
          </ActionMenuItems>
        </ActionMenuStyled>
      )}
    </ActionMenuIconContainer>
  );
};

export default ActionMenu;
