import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Paragraph from '../Components/Paragraph';
import Anchor from '../Components/Anchor';

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
    <Paragraph color="primaryLight" opacity={0.8}>
      <Anchor href="https://github.com/EmilisM/record-keep" target="_blank">
        Record Keep
      </Anchor>{' '}
      by Emilis Makutėnas - 2020
    </Paragraph>
  </FooterStyled>
);

export default Footer;
