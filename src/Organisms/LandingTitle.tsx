import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import H from 'Atoms/H';
import Link from 'Atoms/Link/Link';
import HomeLinks from 'Molecules/HomeLinks';

const TitleStyled = styled.div`
  padding: 10% 10% 10px;
`;

const HeadingFirstStyled = styled(H)`
  margin: 0 0 10px 0;

  white-space: nowrap;
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
    <HeadingFirstStyled fontWeight="bold" fontSize="veryBig" level="1">
      <LinkStyled to="Home">Record Keep</LinkStyled>
    </HeadingFirstStyled>
    <HeadingSecondStyled fontWeight="regular" fontSize="big" level="2">
      An online music collection for avid listeners.
    </HeadingSecondStyled>
    <HomeLinks />
  </TitleStyled>
);

export default LandingTitle;
