import React, { ReactElement, ReactNode, FC } from 'react';
import styled from 'styled-components/macro';

import { DashboardRouteType } from 'Routes/RouteConfig';

import NavLink from 'Atoms/Link/NavLink';

type Props = {
  className?: string;
  to: DashboardRouteType | 'Logout';
  children: ReactNode;
  Icon: FC;
};

const NavLinkStyled = styled(NavLink).attrs({
  activeClassName: 'nav-link-active',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;

  &.${props => props.activeClassName} {
    background-color: ${props => props.theme.colors.background.secondaryDarkest};
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 30px;
    width: 30px;

    fill: ${props => props.theme.colors.text.primaryLight};
  }
`;

const TitleContainer = styled.div`
  margin-left: 15px;
`;

const DashboardMenuLink = ({ className, to, children, Icon }: Props): ReactElement => (
  <NavLinkStyled fontWeight="light" className={className} to={to}>
    <IconContainer>
      <Icon />
    </IconContainer>
    <TitleContainer>{children}</TitleContainer>
  </NavLinkStyled>
);

export default DashboardMenuLink;
