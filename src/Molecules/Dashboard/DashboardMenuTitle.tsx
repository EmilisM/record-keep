import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as Arrow } from 'Assets/Arrow.svg';

import P from 'Atoms/Text/P';

const TitleContainer = styled.div<Props>`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: flex-start;

  padding: 20px 0;
`;

const PStyled = styled(P)`
  white-space: nowrap;
  line-height: 30px;
`;

const ArrowStyled = styled(Arrow)`
  width: 30px;
  height: auto;

  fill: ${props => props.theme.colors.text.primaryLight};
  transition: all 0.3s ease;
`;

const IconContainer = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  width: 30px;

  ${ArrowStyled} {
    transform: rotateZ(${props => (props.isOpen ? '-180deg' : '0deg')});
  }
  margin: 0 15px;
`;

type Props = {
  className?: string;
  isOpen: boolean;
  onClick?(): void;
};

const DashboardMenuTitle = ({ className, isOpen, onClick }: Props): ReactElement => (
  <TitleContainer className={className} isOpen={isOpen}>
    <IconContainer onClick={onClick} isOpen={isOpen}>
      <ArrowStyled />
    </IconContainer>
    <PStyled fontWeight="semiBold" fontSize="big">
      Record Keep
    </PStyled>
  </TitleContainer>
);

export default DashboardMenuTitle;
