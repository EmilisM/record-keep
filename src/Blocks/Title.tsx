import React, { ReactElement } from 'react';
import Heading from '../Components/Heading';
import styled from 'styled-components/macro';

const TitleBlockStyled = styled.div`
  padding: 10% 10% 0;
`;

const HeadingFirstStyled = styled(Heading)`
  margin: 0 0 10px 0;
`;

const HeadingSecondStyled = styled(Heading)`
  margin: 0 0 40px 0;
`;

const TitleBlock = (): ReactElement => (
  <TitleBlockStyled>
    <HeadingFirstStyled fontWeight="600" fontSize={80} level="1">
      Record Keep
    </HeadingFirstStyled>
    <HeadingSecondStyled fontSize={40} level="2">
      An online music collection for avid listeners.
    </HeadingSecondStyled>
  </TitleBlockStyled>
);

export default TitleBlock;