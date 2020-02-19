import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import P from 'Atoms/P';
import A from 'Atoms/Link/A';

const FooterStyled = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-top: auto;
  max-height: 48px;
  height: 100%;
`;

type Props = {
  className?: string;
};

const Footer = ({ className }: Props): ReactElement => (
  <FooterStyled className={className}>
    <P color="primaryLight" opacity={0.8} fontWeight="300">
      <A href="https://github.com/EmilisM/record-keep" target="_blank">
        Record Keep
      </A>{' '}
      by Emilis Makutėnas - 2020
    </P>
  </FooterStyled>
);

export default Footer;
