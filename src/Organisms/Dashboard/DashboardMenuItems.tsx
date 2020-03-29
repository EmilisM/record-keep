import React, { ReactElement, MouseEvent } from 'react';
import styled from 'styled-components/macro';

import { dashboardMenuItems } from 'Types/Dashboard';
import DashboardMenuLink from 'Molecules/Dashboard/DashboardMenuLink';
import { ReactComponent as Logout } from 'Assets/Logout.svg';
import { RouteConfig } from 'Routes/RouteConfig';

const MobileMenuItemContainer = styled.ul`
  overflow: hidden;
  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const MobileMenuItem = styled.li`
  min-height: 60px;

  display: flex;
  justify-content: start;
  align-items: center;

  font-weight: ${props => props.theme.font.fontWeight.regular};
  color: ${props => props.theme.colors.text.primaryLight};
`;

const MobileMenuItemLogout = styled(MobileMenuItem)`
  margin-top: auto;
`;

const DashboardMenuLinkStyled = styled(DashboardMenuLink)`
  width: 100%;
  padding: 15px;

  white-space: nowrap;

  svg {
    width: 30px;
    height: 30px;
  }
`;

type Props = {
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const MobileMenuItems = ({ className, onClick }: Props): ReactElement => (
  <MobileMenuItemContainer className={className}>
    {dashboardMenuItems.map(item => (
      <MobileMenuItem key={item.label}>
        <DashboardMenuLinkStyled Icon={item.icon} to={item.to} onClick={onClick}>
          {item.label}
        </DashboardMenuLinkStyled>
      </MobileMenuItem>
    ))}
    <MobileMenuItemLogout>
      <DashboardMenuLinkStyled Icon={Logout} to={RouteConfig.Logout}>
        Log out
      </DashboardMenuLinkStyled>
    </MobileMenuItemLogout>
  </MobileMenuItemContainer>
);

export default MobileMenuItems;
