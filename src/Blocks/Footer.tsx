import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

const FooterStyled = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 48px;
  z-index: -1;

  background-color: ${props => props.theme.colors.background.primary};
`;

type Props = {
  className?: string;
};

const Footer = ({ className }: Props): ReactElement => (
  <FooterStyled className={className}>
    <p>Emilis Makutėnas</p>
  </FooterStyled>
);

export default Footer;
