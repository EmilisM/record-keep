import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/macro';

const ListStyled = styled.ul`
  width: 100%;
  list-style: none;

  margin: 0;
  padding: 0;
`;

type Props = {
  className?: string;
  children?: ReactNode;
};

const List = ({ children, className }: Props): ReactElement => (
  <ListStyled className={className}>{children}</ListStyled>
);

export default List;
