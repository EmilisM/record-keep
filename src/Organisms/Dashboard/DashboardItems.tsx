import React, { ReactElement, MouseEvent } from 'react';
import styled from 'styled-components/macro';

import { dashboardMenuItems } from 'Types/Dashboard';
import DashboardLink from 'Molecules/Dashboard/DashboardLink';
import { ReactComponent as Logout } from 'Assets/Logout.svg';

const DashboardItemsContainer = styled.ul`
  overflow: hidden;
  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const DashboardItem = styled.li`
  min-height: 60px;

  display: flex;
  justify-content: start;
  align-items: center;

  font-weight: ${props => props.theme.font.fontWeight.regular};
  color: ${props => props.theme.colors.text.primaryLight};
`;

const DashboardItemLogout = styled(DashboardItem)`
  margin-top: auto;
`;

const DashboardLinkStyled = styled(DashboardLink)`
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
  onClickLogout: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const DashboardItems = ({ className, onClick, onClickLogout }: Props): ReactElement => (
  <DashboardItemsContainer className={className}>
    {dashboardMenuItems.map(item => (
      <DashboardItem key={item.label}>
        <DashboardLinkStyled Icon={item.icon} to={item.to} onClick={onClick}>
          {item.label}
        </DashboardLinkStyled>
      </DashboardItem>
    ))}
    <DashboardItemLogout>
      <DashboardLinkStyled Icon={Logout} to="#" onClick={onClickLogout}>
        Log out
      </DashboardLinkStyled>
    </DashboardItemLogout>
  </DashboardItemsContainer>
);

export default DashboardItems;
