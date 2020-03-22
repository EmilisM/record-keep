import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';

type Props = {
  className?: string;
  title: string;
  children: ReactNode;
};

const CardStyled = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const CardHeader = styled(H)`
  background: ${props => props.theme.colors.background.secondaryDarker};
  padding: 10px;
`;

const CardContent = styled.div`
  padding: 10px;
`;

const CardWithHeader = ({ className, title, children }: Props): ReactElement => (
  <CardStyled className={className}>
    <CardHeader fontSize="small" color="primaryLight" fontWeight="regular" level="2">
      {title}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </CardStyled>
);

export default CardWithHeader;
