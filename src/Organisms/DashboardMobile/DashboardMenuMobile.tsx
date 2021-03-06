import React, { ReactElement, MouseEvent } from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as Arrow } from 'Assets/Arrow.svg';

import H from 'Atoms/Text/H';
import Link from 'Atoms/Link/Link';
import DashboardItems from 'Organisms/Dashboard/DashboardItems';
import { RouteConfig } from 'Routes/RouteConfig';

const ArrowStyled = styled(Arrow)`
  height: 34px;
  width: 34px;

  fill: ${props => props.theme.colors.text.primaryLight};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const MobileMenuStyled = styled.div<Pick<Props, 'isOpen'>>`
  width: 100%;
  height: ${props => (props.isOpen ? '354px' : '54px')};

  display: none;
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: flex;
  }

  flex-direction: column;
  align-items: flex-start;

  ${ArrowStyled} {
    transform: rotateZ(${props => (props.isOpen ? '-90deg' : '90deg')});
  }
  transition: all 0.3s ease;

  border-image: linear-gradient(
      110deg,
      ${props => props.theme.colors.background.secondaryLighter} -10%,
      ${props => props.theme.colors.background.secondaryDarkLighter} 10%,
      ${props => props.theme.colors.background.secondaryDarkerLighter} 40%,
      ${props => props.theme.colors.background.secondaryDarkestLighter} 100%
    )
    0 0 1 0 / 2px;
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

  padding: 10px 15px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

type Props = {
  className?: string;
  isOpen?: boolean;
  onClick: () => void;
  onClickLogout: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const DashboardMenuMobile = ({ className, isOpen, onClick, onClickLogout }: Props): ReactElement => (
  <MobileMenuStyled isOpen={isOpen} className={className}>
    <HeaderContainer>
      <TitleStyled fontWeight="semiBold" fontSize="dashboardTitle" level="1">
        <LinkStyled fontSize="dashboardTitle" to={RouteConfig.Dashboard.Home} onClick={onClick}>
          Record keep
        </LinkStyled>
      </TitleStyled>
      <ArrowStyled onClick={onClick} />
    </HeaderContainer>
    <DashboardItems onClick={() => isOpen && onClick()} onClickLogout={onClickLogout} />
  </MobileMenuStyled>
);

export default DashboardMenuMobile;
