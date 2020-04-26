import React, { ReactElement, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import { ReactComponent as Add } from 'Assets/Add.svg';
import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import { ReactComponent as Close } from 'Assets/Close.svg';
import H from 'Atoms/Text/H';
import InputDashboard from 'Atoms/Input/InputDashboard';

const NewCollectionItemStyled = styled(Card)`
  display: flex;
  align-items: center;

  padding: 10px 20px;

  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 10px 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }

  &:hover {
    background-color: ${props => props.theme.colors.background.primaryDarker};
  }

  transition: all 300ms ease;
`;

const ImageContainer = styled.div`
  width: 96px;
  height: 96px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
  }
`;

const AddStyled = styled(Add)`
  width: 50px;
  height: 50px;

  fill: ${props => props.theme.colors.text.primaryDarker};
`;

const ArrowStyled = styled(Arrow)`
  width: 35px;
  height: 35px;

  fill: ${props => props.theme.colors.text.primaryDarker};
  margin-left: 10px;
`;

const CloseStyled = styled(Close)`
  width: 30px;
  height: 30px;

  fill: ${props => props.theme.colors.text.primaryDarker};
  margin-left: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 10px;
  }
`;

const InputDashboardStyled = styled(InputDashboard)`
  max-width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 160px;
  }
`;

type Props = {
  className?: string;
  onClick: () => void;
  onSubmit: () => void;
  isEditable: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

const NewCollectionItem = ({
  className,
  onClick,
  onSubmit,
  isEditable,
  value,
  onChange,
  onClear,
}: Props): ReactElement => {
  const onKeyPressInput = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <NewCollectionItemStyled onClick={onClick} className={className}>
      <ImageContainer>
        <AddStyled />
      </ImageContainer>
      <TitleContainer>
        {isEditable ? (
          <>
            <InputDashboardStyled
              id="input"
              name="input"
              color="primaryDarker"
              placeholder="Collection name"
              fontSize="normal"
              fontWeight="semiBold"
              autoFocus
              onKeyPress={onKeyPressInput}
              value={value}
              onChange={onChange}
            />
            <CloseStyled onClick={onClear} />
            <ArrowStyled onClick={onSubmit} />
          </>
        ) : (
          <H level="2" fontSize="regular" fontWeight="semiBold" color="primaryDarker">
            New collection
          </H>
        )}
      </TitleContainer>
    </NewCollectionItemStyled>
  );
};

export default NewCollectionItem;
