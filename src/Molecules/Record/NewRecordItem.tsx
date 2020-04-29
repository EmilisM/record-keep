import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import { ReactComponent as Add } from 'Assets/Add.svg';
import H from 'Atoms/Text/H';

const NewRecorditemStyled = styled(Card)`
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

type Props = {
  className?: string;
  onClick: () => void;
};

const NewRecorditem = ({ className, onClick }: Props): ReactElement => (
  <NewRecorditemStyled onClick={onClick} className={className}>
    <ImageContainer>
      <AddStyled />
    </ImageContainer>
    <TitleContainer>
      <H level="2" fontSize="regular" fontWeight="semiBold" color="primaryDarker">
        New Record
      </H>
    </TitleContainer>
  </NewRecorditemStyled>
);

export default NewRecorditem;
