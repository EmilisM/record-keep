import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import H from 'Atoms/Text/H';
import Link from 'Atoms/Link/Link';
import LandingLinks from 'Molecules/LandingLinks';

const TitleStyled = styled.div`
  padding: 6% 10% 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 3% 5% 20px;
  }
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
    <HeadingFirstStyled fontWeight="semiBold" fontSize="veryBig" level="1">
      <LinkStyled to="Home">Record Keep</LinkStyled>
    </HeadingFirstStyled>
    <HeadingSecondStyled fontWeight="regular" fontSize="big" level="2">
      An online music collection for enthusiasts.
    </HeadingSecondStyled>
    <LandingLinks />
  </TitleStyled>
);

export default LandingTitle;
