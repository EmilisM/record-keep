import React, { ReactElement, FC } from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as Home } from 'Assets/Home.svg';
import { ReactComponent as Collections } from 'Assets/Collections.svg';
import { ReactComponent as Analysis } from 'Assets/Analysis.svg';
import { DashboardRouteType } from 'Routes/RouteConfig';

import DashboardMenuLink from 'Molecules/Dashboard/DashboardMenuLink';
import DashboardMenuTitle from 'Molecules/Dashboard/DashboardMenuTitle';

const DashboardMenuStyled = styled.div<Props>`
  height: 100%;
  width: 100%;
  max-width: ${props => (props.isOpen ? '300' : '60')}px;

  background-image: linear-gradient(
    110deg,
    ${props => props.theme.colors.background.secondary} -10%,
    ${props => props.theme.colors.background.secondaryDark} 10%,
    ${props => props.theme.colors.background.secondaryDarker} 40%,
    ${props => props.theme.colors.background.secondaryDarkest} 100%
  );

  border: solid;
  border-width: 0 1px 0 0;
  border-color: ${props => props.theme.colors.border.primary};
  overflow: hidden;

  display: flex;
  flex-direction: column;

  @media ${props => props.theme.responsive.mobile} {
    display: none;
  }

  transition: all 0.3s ease;
`;

const MainContainer = styled.div<Props>`
  padding: ${props => (props.isOpen ? '20px 20px' : '20px 10px')};
  transition: all 0.3s ease;
`;

const MenuItemContainer = styled.div`
  margin-top: 50px;
`;

const DashboardMenuLinkStyled = styled(DashboardMenuLink)`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: auto;

  border-image: linear-gradient(
      110deg,
      ${props => props.theme.colors.background.secondaryLighter} -10%,
      ${props => props.theme.colors.background.secondaryDarkLighter} 10%,
      ${props => props.theme.colors.background.secondaryDarkerLighter} 40%,
      ${props => props.theme.colors.background.secondaryDarkestLighter} 100%
    )
    1 0 0 / 2px;
`;

type Props = {
  className?: string;
  isOpen: boolean;
  onClick?(): void;
};

type DashboardMenuItem = {
  label: string;
  icon: FC;
  to: DashboardRouteType;
};

const dashboardMenuItems: DashboardMenuItem[] = [
  {
    label: 'Home',
    icon: Home,
    to: 'DashboardHome',
  },
  {
    label: 'Collections',
    icon: Collections,
    to: 'DashboardCollections',
  },
  {
    label: 'Analysis',
    icon: Analysis,
    to: 'DashboardAnalysis',
  },
];

const DashboardMenu = ({ className, isOpen, onClick }: Props): ReactElement => (
  <DashboardMenuStyled className={className} isOpen={isOpen} role="presentation">
    <MainContainer isOpen={isOpen}>
      <DashboardMenuTitle isOpen={isOpen} onClick={onClick} />
      <MenuItemContainer>
        {dashboardMenuItems.map(item => (
          <DashboardMenuLinkStyled key={item.label} to={item.to} Icon={item.icon}>
            {item.label}
          </DashboardMenuLinkStyled>
        ))}
      </MenuItemContainer>
    </MainContainer>
    <BottomContainer />
  </DashboardMenuStyled>
);

export default DashboardMenu;
