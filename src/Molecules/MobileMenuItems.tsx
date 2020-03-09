import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import { dashboardMenuItems } from 'Types/Dashboard';
import DashboardMenuLink from './Dashboard/DashboardMenuLink';

const MobileMenuItemContainer = styled.ul`
  overflow: hidden;
  margin: 10px 0 0 0;

  padding: 0;

  width: 100%;
  height: 100%;
`;

const MobileMenuItem = styled.li`
  min-height: 50px;

  display: flex;
  justify-content: start;
  align-items: center;

  font-weight: ${props => props.theme.font.fontWeight.regular};
  color: ${props => props.theme.colors.text.primaryLight};
`;

const DashboardMenuLinkStyled = styled(DashboardMenuLink)`
  width: 100%;
  height: 50px;

  svg {
    width: 30px;
    height: 30px;
  }
`;

type Props = {
  className?: string;
};

const MobileMenuItems = ({ className }: Props): ReactElement => (
  <MobileMenuItemContainer className={className}>
    {dashboardMenuItems.map(item => (
      <MobileMenuItem key={item.label}>
        <DashboardMenuLinkStyled Icon={item.icon} to={item.to}>
          {item.label}
        </DashboardMenuLinkStyled>
      </MobileMenuItem>
    ))}
  </MobileMenuItemContainer>
);

export default MobileMenuItems;
