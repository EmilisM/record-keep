import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import Link from 'Atoms/Link';

const HomeLinksContainer = styled.div`
  padding: 10px 0px;

  display: flex;
  flex-direction: row;
`;

const LinkSeparator = styled.div`
  width: 1px;
  background-color: ${props => props.theme.colors.background.primary};
`;

const HomeLink = styled(Link)`
  &:not(:first-child) {
    padding-left: 10px;
  }
  &:not(:last-child) {
    padding-right: 10px;
  }
`;

const HomeLinks = (): ReactElement => (
  <HomeLinksContainer>
    <HomeLink to="Home" fontSize={22} fontWeight="300">
      Home
    </HomeLink>
    <LinkSeparator />
    <HomeLink to="Login" fontSize={22} fontWeight="300">
      Login / Signup
    </HomeLink>
    <LinkSeparator />
    <HomeLink to="About" fontSize={22} fontWeight="300">
      About
    </HomeLink>
  </HomeLinksContainer>
);

export default HomeLinks;
