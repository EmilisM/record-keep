import React, { ReactElement } from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components/macro';

type Props = {
  className?: string;
};

const SelectStyled = styled(ReactSelect)``;

const Select = ({ className }: Props): ReactElement => <SelectStyled className={className} />;

export default Select;
