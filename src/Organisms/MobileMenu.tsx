import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as Arrow } from 'Assets/Arrow.svg';

import H from 'Atoms/Text/H';
import Link from 'Atoms/Link/Link';
import MobileMenuItems from 'Molecules/MobileMenuItems';

const ArrowStyled = styled(Arrow)`
  height: 34px;
  width: 34px;

  fill: ${props => props.theme.colors.text.primaryLight};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const MobileMenuStyled = styled.div<Props>`
  width: 100%;
  height: ${props => (props.isOpen ? '214px' : '54px')};

  position: sticky;
  top: 0;

  padding: 10px;

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
  height: 34px;
`;

type Props = {
  className?: string;
  isOpen?: boolean;
  onClick?(): void;
};

const MobileMenu = ({ className, isOpen, onClick }: Props): ReactElement => (
  <MobileMenuStyled isOpen={isOpen} className={className}>
    <HeaderContainer>
      <TitleStyled fontWeight="semiBold" fontSize="regular" level="1">
        <LinkStyled to="DashboardHome">Record keep</LinkStyled>
      </TitleStyled>
      <ArrowStyled onClick={onClick} />
    </HeaderContainer>
    <MobileMenuItems />
  </MobileMenuStyled>
);

export default MobileMenu;
