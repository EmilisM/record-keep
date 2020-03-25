import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import Image from 'Atoms/Image';
import Link from 'Atoms/Link/Link';
import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import { RouteConfig } from 'Routes/RouteConfig';

type Props = {
  className?: string;
  name: string;
  count: number;
};

const CollectionItemStyled = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 20px;
  background: ${props => props.theme.colors.background.primary};
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};

  &:focus {
    opacity: 1;
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 10px 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const ArrowStyled = styled(Arrow)`
  width: 40px;
  height: 40px;

  margin: 0 0 0 auto;
`;

const ImageStyled = styled(Image)`
  width: 96px;
  height: 96px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 64px;
    height: 64px;
  }
`;

const CollectionItem = ({ className, name, count }: Props): ReactElement => (
  <CollectionItemStyled to={`${RouteConfig.Dashboard.Collections.Root}/${name}`} className={className}>
    <ImageStyled
      src={`https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fnandostudio%2Fbe-the-dj%2F128%2Fvinyl-icon.png&f=1&nofb=1`}
    />
    <TitleContainer>
      <H level="2" fontSize="regular" fontWeight="semiBold" color="primaryDarker">
        {name}
      </H>
      <H level="3" fontSize="regular" fontWeight="light" color="primaryDarker">
        {count} {count > 1 ? 'records' : 'record'}
      </H>
    </TitleContainer>
    <ArrowStyled />
  </CollectionItemStyled>
);

export default CollectionItem;
