import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import { ReactComponent as Add } from 'Assets/Add.svg';
import H from 'Atoms/Text/H';

type Props = {
  className?: string;
};

const NewCollectionItemStyled = styled(Card)`
  display: flex;
  align-items: center;

  padding: 10px 20px;
  border: dashed 2px ${props => props.theme.colors.border.cardShadow};

  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 10px 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }

  transition: all 300ms ease;
`;

const ArrowContainer = styled.div`
  width: 96px;
  height: 96px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 64px;
    height: 64px;
  }
`;

const ArrowStyled = styled(Add)`
  width: 50px;
  height: 50px;

  fill: ${props => props.theme.colors.text.primaryDarker};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const NewCollectionItem = ({ className }: Props): ReactElement => (
  <NewCollectionItemStyled className={className}>
    <ArrowContainer>
      <ArrowStyled />
    </ArrowContainer>
    <TitleContainer>
      <H level="2" fontSize="regular" fontWeight="semiBold" color="primaryDarker">
        New collection
      </H>
    </TitleContainer>
  </NewCollectionItemStyled>
);

export default NewCollectionItem;
