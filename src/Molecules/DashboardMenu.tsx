import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';

import { ReactComponent as Arrow } from 'Assets/Arrow.svg';

type Props = {
  className?: string;
  isOpen: boolean;
  onClick?(): void;
};

const DashboardMenuStyled = styled.div<Props>`
  height: 100%;
  width: 100%;
  max-width: ${props => (props.isOpen ? '300' : '50')}px;
  padding: ${props => (props.isOpen ? '20px' : '20px 10px 20px')};
  ${props => !props.isOpen && 'cursor: pointer;'}

  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.colors.background.secondary} -10%,
    ${props => props.theme.colors.background.secondaryDark} 10%,
    ${props => props.theme.colors.background.secondaryDarker} 40%,
    ${props => props.theme.colors.background.secondaryDarkest} 100%
  );

  border: solid;
  border-width: 0 1px 0 0;
  border-color: ${props => props.theme.colors.border.primary};
  overflow: hidden;

  display: none;
  @media ${props => props.theme.responsive.desktop} {
    display: flex;
    flex-direction: column;
  }
  transition: all 0.3s ease;
`;

const HStyled = styled(H)`
  white-space: nowrap;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  align-items: center;
  justify-content: space-between;
`;

const ArrowStyled = styled(Arrow)`
  height: 30px;
  width: auto;

  fill: ${props => props.theme.colors.text.primaryLight};
  transition: all 0.3s ease;
`;

const IconContainer = styled.div<Props>`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${ArrowStyled} {
    transform: rotateZ(${props => (props.isOpen ? '-180deg' : '0deg')});
  }
`;

const DashboardMenu = ({ className, isOpen, onClick }: Props): ReactElement => (
  <DashboardMenuStyled
    className={className}
    isOpen={isOpen}
    onClick={!isOpen ? onClick : undefined}
    role="presentation"
  >
    <TitleContainer>
      {isOpen && (
        <HStyled fontWeight="semiBold" fontSize="medium" level="1">
          Record Keep
        </HStyled>
      )}
      <IconContainer onClick={isOpen ? onClick : undefined} isOpen={isOpen}>
        <ArrowStyled />
      </IconContainer>
    </TitleContainer>
  </DashboardMenuStyled>
);

export default DashboardMenu;
