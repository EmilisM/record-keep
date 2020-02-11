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

const ParagraphStyled = styled(Paragraph)`
  color: ${props => props.theme.colors.text.primaryLight};
  opacity: 0.8;
`;

const AnchorStyled = styled(Anchor)`
  color: ${props => props.theme.colors.text.primaryLight};
`;

type Props = {
  className?: string;
};

const Footer = ({ className }: Props): ReactElement => (
  <FooterStyled className={className}>
    <ParagraphStyled>
      <AnchorStyled href="https://github.com/EmilisM/record-keep" target="_blank" rel="noopener noreferrer">
        Record Keep
      </AnchorStyled>{' '}
      by Emilis Makutėnas - 2020
    </ParagraphStyled>
  </FooterStyled>
);

export default Footer;
