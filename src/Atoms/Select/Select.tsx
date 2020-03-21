import React, { ReactElement } from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components/macro';
import SelectControl from 'Atoms/Select/SelectControl';

type Props = {
  className?: string;
  classNamePrefix?: string;
  placeholder?: string;
  showSearch?: boolean;
};

const SelectStyled = styled(ReactSelect)<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight.regular};
  background-color: ${props => props.theme.colors.background.primary};
  border-radius: 6px;

  .${props => props.classNamePrefix}__control {
    border: none;
    box-shadow: none;

    padding-left: 10px;
  }

  .${props => props.classNamePrefix}__indicator-separator {
    display: none;
  }

  .${props => props.classNamePrefix}__search-icon {
    ${props => !props.showSearch && 'display: none'};

    width: 25px;
    fill: ${props => props.theme.colors.text.primaryDark};
  }

  .${props => props.classNamePrefix}__input {
    color: ${props => props.theme.colors.text.primaryDark};
  }

  .${props => props.classNamePrefix}__dropdown-indicator {
    color: ${props => props.theme.colors.text.primaryDark};
  }
`;

const Select = ({ className, classNamePrefix = 'select-styled', placeholder, showSearch }: Props): ReactElement => (
  <SelectStyled
    className={className}
    classNamePrefix={classNamePrefix}
    placeholder={placeholder}
    showSearch={showSearch}
    components={{
      Control: SelectControl,
    }}
  />
);

export default Select;
