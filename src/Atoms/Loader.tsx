import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

const LoaderStyled = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;

  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 80%);

  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type Props = {
  className?: string;
};

const Loader = ({ className }: Props): ReactElement => <LoaderStyled className={className} />;

export default Loader;
