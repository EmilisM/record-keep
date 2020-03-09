import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as Arrow } from 'Assets/Arrow.svg';

import H from 'Atoms/Text/H';

const TitleContainer = styled.div<Props>`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: ${props => (props.isOpen ? '20px 20px' : '20px 10px')};
`;

const HStyled = styled(H)`
  white-space: nowrap;

  line-height: 30px;
`;

const ArrowStyled = styled(Arrow)`
  height: 30px;
  width: auto;

  fill: ${props => props.theme.colors.text.primaryLight};
  transition: all 0.3s ease;
`;

const IconContainer = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  width: 40px;

  ${ArrowStyled} {
    transform: rotateZ(${props => (props.isOpen ? '-180deg' : '0deg')});
  }
`;

type Props = {
  className?: string;
  isOpen: boolean;
  onClick?(): void;
};

const DashboardMenuTitle = ({ className, isOpen, onClick }: Props): ReactElement => (
  <TitleContainer className={className} isOpen={isOpen}>
    {isOpen && (
      <HStyled fontWeight="semiBold" fontSize="medium" level="1">
        Record Keep
      </HStyled>
    )}
    <IconContainer onClick={onClick} isOpen={isOpen}>
      <ArrowStyled />
    </IconContainer>
  </TitleContainer>
);

export default DashboardMenuTitle;
