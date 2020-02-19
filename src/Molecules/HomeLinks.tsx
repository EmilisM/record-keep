import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import NavLink from 'Atoms/Link/NavLink';

const HomeLinksContainer = styled.div`
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
})`
  opacity: 0.6;

  &:hover,
  &:active,
  &.${props => props.activeClassName} {
    opacity: 1;
  }
`;

const HomeLinks = (): ReactElement => (
  <HomeLinksContainer>
    <NavLinkStyled to="Home" fontSize={22} fontWeight="300">
      Home
    </NavLinkStyled>
    <LinkSeparator />
    <NavLinkStyled to="Login" fontSize={22} fontWeight="300">
      Login / Signup
    </NavLinkStyled>
    <LinkSeparator />
    <NavLinkStyled to="About" fontSize={22} fontWeight="300">
      About
    </NavLinkStyled>
  </HomeLinksContainer>
);

export default HomeLinks;
