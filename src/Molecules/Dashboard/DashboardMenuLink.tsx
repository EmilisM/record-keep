import React, { ReactElement, ReactNode, FC } from 'react';
import styled from 'styled-components/macro';

import { DashboardRouteType } from 'Routes/RouteConfig';

import NavLink from 'Atoms/Link/NavLink';

type Props = {
  className?: string;
  to: DashboardRouteType;
  children: ReactNode;
  Icon: FC;
};

const NavLinkStyled = styled(NavLink).attrs({
  activeClassName: 'nav-link-active',
})`
  display: flex;
  flex-direction: row;
  align-items: center;

  .${props => props.activeClassName} {
    opacity: 0.8;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 40px;
    width: 40px;

    fill: ${props => props.theme.colors.text.primaryLight};
  }
`;

const TitleContainer = styled.div`
  margin-left: 10px;
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
