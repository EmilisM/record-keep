import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import H from 'Atoms/H';
import Link from 'Atoms/Link';
import HomeLinks from 'Molecules/HomeLinks';

const TitleStyled = styled.div`
  padding: 10% 10% 10px;
`;

const HeadingFirstStyled = styled(H)`
  margin: 0 0 10px 0;
`;

const HeadingSecondStyled = styled(H)`
  margin: 0 0 10px 0;
`;

const LinkStyled = styled(Link)`
  font-size: inherit;
  font-weight: inherit;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const LandingTitle = (): ReactElement => (
  <TitleStyled>
    <HeadingFirstStyled fontWeight="600" fontSize={80} level="1">
      <LinkStyled to="Home">Record Keep</LinkStyled>
    </HeadingFirstStyled>
    <HeadingSecondStyled fontSize={40} level="2">
      An online music collection for avid listeners.
    </HeadingSecondStyled>
    <HomeLinks />
  </TitleStyled>
);

export default LandingTitle;
