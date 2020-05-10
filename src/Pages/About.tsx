import React, { ReactElement } from 'react';
import P from 'Atoms/Text/P';
import A from 'Atoms/Link/A';
import styled from 'styled-components/macro';

const AStyled = styled(A)`
  font-size: inherit;
`;

const About = (): ReactElement => (
  <P fontSize="medium" fontWeight="light">
    <b>Record Keep</b> is a platform used to organize, maintain and keep, your own record collections.
    <br />
    <br />
    Wide variety of features let&apos;s you analyze your records.
    <br />
    <br />
    Platform is for registered users only, use navigation to take yourself to login page.
    <br />
    <br />
    Icons made by <AStyled href="https://www.flaticon.com/authors/freepik">Freepik</AStyled> from{' '}
    <AStyled href="https://www.flaticon.com/">www.flaticon.com</AStyled>
  </P>
);

export default About;
