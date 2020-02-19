import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import NavLink from 'Atoms/NavLink';

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

const HomeLinks = (): ReactElement => (
  <HomeLinksContainer>
    <NavLink to="Home" fontSize={22} fontWeight="300">
      Home
    </NavLink>
    <LinkSeparator />
    <NavLink to="Login" fontSize={22} fontWeight="300">
      Login / Signup
    </NavLink>
    <LinkSeparator />
    <NavLink to="About" fontSize={22} fontWeight="300">
      About
    </NavLink>
  </HomeLinksContainer>
);

export default HomeLinks;
