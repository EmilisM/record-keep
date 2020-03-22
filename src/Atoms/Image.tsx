import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

type Props = {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

const Image = ({ className, src, alt }: Props): ReactElement => <img className={className} src={src} alt={alt} />;

const ImageStyled = styled(Image)<Props>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

export default ImageStyled;
