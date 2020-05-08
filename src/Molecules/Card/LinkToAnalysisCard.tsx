import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';
import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import Link from 'Atoms/Link/Link';
import { RouteConfig } from 'Routes/RouteConfig';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};

  width: 100%;
`;

const LinkStyled = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 10px 20px;
`;

const ArrowStyled = styled(Arrow)`
  width: 30px;
  height: 30px;
  fill: ${props => props.theme.colors.text.primaryLight};
`;

type Props = {
  className?: string;
  collectionId: string;
};

const LinkToAnalysisCard = ({ className, collectionId }: Props): ReactElement => (
  <CardStyled className={className}>
    <LinkStyled to={`${RouteConfig.Dashboard.Analysis.Root}/${collectionId}`}>
      <H level="2" fontSize="normal" fontWeight="semiBold">
        Go to analysis
      </H>
      <ArrowStyled />
    </LinkStyled>
  </CardStyled>
);

export default LinkToAnalysisCard;
