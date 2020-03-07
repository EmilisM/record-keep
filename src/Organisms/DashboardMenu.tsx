import React, { ReactElement, FC } from 'react';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';

import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import { ReactComponent as Home } from 'Assets/Home.svg';
import { ReactComponent as Collections } from 'Assets/Collections.svg';
import { ReactComponent as Analysis } from 'Assets/Analysis.svg';
import DashboardMenuItem from 'Molecules/DashboardMenuLink';
import { DashboardRouteType } from 'Routes/RouteConfig';

const TitleContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  align-items: center;
  justify-content: space-between;
`;

const MenuItemContainer = styled.div`
  margin-top: 50px;
`;

const DashboardMenuStyled = styled.div<Props>`
  height: 100%;
  width: 100%;
  max-width: ${props => (props.isOpen ? '300' : '60')}px;
  padding: ${props => (props.isOpen ? '20px 20px' : '20px 10px')};
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

  display: flex;
  flex-direction: column;

  @media ${props => props.theme.responsive.mobile} {
    display: none;
  }

  transition: all 0.3s ease;
`;

const HStyled = styled(H)`
  white-space: nowrap;
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

const DashboardMenuItemStyled = styled(DashboardMenuItem)`
  &:not(:first-child) {
    margin-top: 20px;
  }
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
    <TitleContainer>
      {isOpen && (
        <HStyled fontWeight="semiBold" fontSize="medium" level="1">
          Record Keep
        </HStyled>
      )}
      <IconContainer onClick={onClick} isOpen={isOpen}>
        <ArrowStyled />
      </IconContainer>
    </TitleContainer>
    <MenuItemContainer>
      {dashboardMenuItems.map(item => (
        <DashboardMenuItemStyled key={item.label} to={item.to} Icon={item.icon}>
          {item.label}
        </DashboardMenuItemStyled>
      ))}
    </MenuItemContainer>
  </DashboardMenuStyled>
);

export default DashboardMenu;
