import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import NavLink from 'Atoms/Link/NavLink';
import { RouteConfig } from 'Routes/RouteConfig';

const HomeLinksContainer = styled.nav`
  display: flex;
  flex-direction: row;
`;

const LinkSeparator = styled.div`
  width: 1px;
  background-color: ${props => props.theme.colors.background.primary};
  margin: 0px 10px;
`;

const NavLinkStyled = styled(NavLink).attrs({
  activeClassName: 'nav-link-active',
})``;

const HomeLinks = (): ReactElement => (
  <HomeLinksContainer>
    <NavLinkStyled to={RouteConfig.Home} fontSize="medium" fontWeight="light">
      Home
    </NavLinkStyled>
    <LinkSeparator />
    <NavLinkStyled to={RouteConfig.Login} fontSize="medium" fontWeight="light">
      Log in / Sign up
    </NavLinkStyled>
    <LinkSeparator />
    <NavLinkStyled to={RouteConfig.About} fontSize="medium" fontWeight="light">
      About
    </NavLinkStyled>
  </HomeLinksContainer>
);

export default HomeLinks;
