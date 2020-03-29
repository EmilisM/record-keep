import React, { ReactElement, useState, MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import Image from 'Atoms/Image';
import Link from 'Atoms/Link/Link';
import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import ActionMenu from 'Organisms/ActionMenu';
import { ActionMenuOption } from 'Types/ActionMenu';
import InputDashboard from 'Atoms/Input/InputDashboard';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 10px;
  }

  transition: 300ms opacity ease;
`;

const ArrowStyled = styled(Arrow)`
  width: 40px;
  height: 40px;

  fill: ${props => props.theme.colors.text.primaryDarker};
  transition: 300ms opacity ease;
  margin-left: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 10px;
    width: 30px;
    height: 30px;
  }
`;

const ImageStyled = styled(Image)`
  width: 96px;
  height: 96px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
  }
`;

const ActionMenuStyled = styled(ActionMenu)`
  margin: 0 0 0 auto;
`;

const CollectionItemStyled = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 20px;
  background: ${props => props.theme.colors.background.primary};
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};

  &:hover {
    background-color: ${props => props.theme.colors.background.primaryDarker};
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 10px 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const InputDashboardStyled = styled(InputDashboard)`
  max-width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 160px;
  }
`;

export type Props = {
  className?: string;
  to?: string;
  accountMenuOptions: ActionMenuOption[];
  title: string;
  subTitle: string;
  isEditable: boolean;
  accountMenuOnChange: (option: ActionMenuOption) => void;
  onEditSubmit: () => void;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  onEditChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CollectionItem = ({
  className,
  title,
  subTitle,
  to,
  isEditable,
  onEditSubmit,
  onEditChange,
  accountMenuOptions,
  accountMenuOnChange,
  onClick,
}: Props): ReactElement => {
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const onClickActionMenu = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    setActionMenuOpen(!actionMenuOpen);
  };

  const onKeyPressInput = (event: KeyboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (event.key === 'Enter') {
      onEditSubmit();
    }
  };

  return (
    <CollectionItemStyled to={to || '#'} onClick={onClick} className={className}>
      <ImageStyled
        src={`https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fnandostudio%2Fbe-the-dj%2F128%2Fvinyl-icon.png&f=1&nofb=1`}
      />
      <TitleContainer>
        {isEditable ? (
          <InputDashboardStyled
            color="primaryDarker"
            placeholder="Collection name"
            fontSize="regular"
            fontWeight="semiBold"
            onKeyPress={onKeyPressInput}
            onChange={onEditChange}
            value={title}
            autoFocus
          />
        ) : (
          <H level="2" fontSize="regular" fontWeight="semiBold" color="primaryDarker">
            {title}
          </H>
        )}
        <H level="3" fontSize="regular" fontWeight="light" color="primaryDarker">
          {subTitle}
        </H>
      </TitleContainer>
      <ActionMenuStyled
        options={accountMenuOptions}
        isOpen={actionMenuOpen}
        onClick={onClickActionMenu}
        onChange={accountMenuOnChange}
      />
      <ArrowStyled />
    </CollectionItemStyled>
  );
};

export default CollectionItem;