import React, { ReactElement } from 'react';

type Props = {
  className?: string;
  src: string;
  alt?: string;
};

const Image = ({ className, src, alt }: Props): ReactElement => <img className={className} src={src} alt={alt} />;

export default Image;
