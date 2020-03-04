import React, { ReactElement, ReactNode, FC } from 'react';
import NavLink from 'Atoms/Link/NavLink';
import { RouteConfigType } from 'Routes/RouteConfig';
import styled from 'styled-components/macro';

type Props = {
  className?: string;
  to: RouteConfigType;
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
  svg {
    height: 30px;
    width: 30px;

    fill: ${props => props.theme.colors.text.primaryLight};
  }
`;

const TitleContainer = styled.div`
  margin-left: 10px;
`;

const DashboardMenuItem = ({ className, to, children, Icon }: Props): ReactElement => (
  <NavLinkStyled className={className} to={to}>
    <IconContainer>
      <Icon />
    </IconContainer>
    <TitleContainer>{children}</TitleContainer>
  </NavLinkStyled>
);

export default DashboardMenuItem;
