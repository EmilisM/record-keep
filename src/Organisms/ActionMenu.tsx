import React, { ReactElement, MouseEvent } from 'react';
import styled from 'styled-components/macro';
import ActionMenuItem from 'Molecules/ActionMenuItem';
import { ActionMenuOption } from 'Types/ActionMenu';
import { ReactComponent as Dots } from 'Assets/Dots.svg';

type Props = {
  className?: string;
  onChange: (option: ActionMenuOption) => void;
  options: ActionMenuOption[];
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  isOpen: boolean;
};

const DotsStyled = styled(Dots)`
  width: 100%;
  height: 100%;

  fill: ${props => props.theme.colors.text.primaryDarker};
`;

const ActionMenuIconContainer = styled.div<Pick<Props, 'isOpen'>>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 10px;
  max-width: 56px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 38px;
    padding: 0 5px;
  }

  background-color: ${props => props.isOpen && props.theme.colors.border.cardShadow};

  &:hover {
    background-color: ${props => props.theme.colors.border.cardShadow};
  }

  transition: 300ms background-color ease;
`;

const ActionMenuStyled = styled.div`
  position: absolute;
  top: 36px;
  right: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: 28px;
  }

  border-radius: 4px;
  background-color: ${props => props.theme.colors.background.primary};
  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};
  z-index: 100;

  min-width: 200px;
`;

const ActionMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.text.primaryDarker};
  list-style: none;

  margin: 0;
  padding: 0;
`;

const ActionMenu = ({ className, options, onChange, isOpen, onClick }: Props): ReactElement => (
  <ActionMenuIconContainer className={className} onClick={onClick} isOpen={isOpen}>
    <DotsStyled />
    {isOpen && (
      <ActionMenuStyled>
        <ActionMenuItems>
          {options.map(option => (
            <ActionMenuItem key={option.value} onClick={() => onChange(option)} option={option} />
          ))}
        </ActionMenuItems>
      </ActionMenuStyled>
    )}
  </ActionMenuIconContainer>
);

export default ActionMenu;
