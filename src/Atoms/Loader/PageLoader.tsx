import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Loader from 'Atoms/Loader/Loader';

type Props = { className?: string };

const Container = styled.div``;

export const PageLoader = ({ className }: Props): ReactElement => (
  <Container className={className}>
    <Loader />
  </Container>
);
