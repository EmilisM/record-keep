import React, { ReactElement } from 'react';
import Select from 'Atoms/Select/Select';
import styled from 'styled-components/macro';

type Props = {
  className?: string;
};

const SelectStyled = styled(Select)`
  min-width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SearchSelect = ({ className }: Props): ReactElement => (
  <SelectStyled className={className} placeholder="Search" showSearch />
);

export default SearchSelect;
