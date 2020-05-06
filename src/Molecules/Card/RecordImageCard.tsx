import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Card from 'Atoms/Card/Card';
import Image from 'Atoms/Image';
import { getDefaultResourceImage } from 'Services/image';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 20px;

  display: flex;
  flex-direction: column;

  width: 100%;
`;

const ImageStyled = styled(Image)`
  width: 192px;
  height: 192px;
`;

type Props = {
  className?: string;
  image?: string;
};

const RecordImageCard = ({ className, image }: Props): ReactElement => (
  <CardStyled className={className}>
    <ImageStyled src={getDefaultResourceImage(image)} />
  </CardStyled>
);

export default RecordImageCard;
