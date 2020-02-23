import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import NavLink from 'Atoms/Link/NavLink';

const HomeLinksContainer = styled.nav`
  padding: 10px 0px;

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
    <NavLinkStyled to="Home" fontSize="medium" fontWeight="light">
      Home
    </NavLinkStyled>
    <LinkSeparator />
    <NavLinkStyled to="Login" fontSize="medium" fontWeight="light">
      Log in / Sign up
    </NavLinkStyled>
    <LinkSeparator />
    <NavLinkStyled to="About" fontSize="medium" fontWeight="light">
      About
    </NavLinkStyled>
  </HomeLinksContainer>
);

export default HomeLinks;
