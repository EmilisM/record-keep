import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as Arrow } from 'Assets/Arrow.svg';

import H from 'Atoms/Text/H';
import Link from 'Atoms/Link/Link';
import DashboardMenuItems from 'Organisms/Dashboard/DashboardMenuItems';

const ArrowStyled = styled(Arrow)`
  height: 34px;
  width: 34px;

  fill: ${props => props.theme.colors.text.primaryLight};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const MobileMenuStyled = styled.div<Props>`
  width: 100%;
  height: ${props => (props.isOpen ? '234px' : '54px')};

  position: sticky;
  top: 0;

  background-image: linear-gradient(
    110deg,
    ${props => props.theme.colors.background.secondary} -10%,
    ${props => props.theme.colors.background.secondaryDark} 10%,
    ${props => props.theme.colors.background.secondaryDarker} 40%,
    ${props => props.theme.colors.background.secondaryDarkest} 100%
  );

  display: none;
  @media ${props => props.theme.responsive.mobile} {
    display: flex;
  }

  flex-direction: column;
  align-items: flex-start;

  ${ArrowStyled} {
    transform: rotateZ(${props => (props.isOpen ? '-90deg' : '90deg')});
  }
  transition: all 0.3s ease;
`;

const TitleStyled = styled(H)`
  line-height: 30px;
  white-space: nowrap;
`;

const LinkStyled = styled(Link)`
  font-size: inherit;
  font-weight: inherit;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 10px;
`;

type Props = {
  className?: string;
  isOpen?: boolean;
  onClick?(): void;
};

const DashboardMenuMobile = ({ className, isOpen, onClick }: Props): ReactElement => (
  <MobileMenuStyled isOpen={isOpen} className={className}>
    <HeaderContainer>
      <TitleStyled fontWeight="semiBold" fontSize="regular" level="1">
        <LinkStyled to="DashboardHome">Record keep</LinkStyled>
      </TitleStyled>
      <ArrowStyled onClick={onClick} />
    </HeaderContainer>
    <DashboardMenuItems />
  </MobileMenuStyled>
);

export default DashboardMenuMobile;
