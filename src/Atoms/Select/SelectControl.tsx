import React, { ReactElement } from 'react';
import { components, ControlProps, OptionTypeBase } from 'react-select';
import { ReactComponent as Search } from 'Assets/Search.svg';

const { Control } = components;

const SelectControl = ({ children, ...props }: ControlProps<OptionTypeBase>): ReactElement => (
  <Control {...props}>
    <Search className={`${props.selectProps.classNamePrefix}__search-icon`} />
    {children}
  </Control>
);

export default SelectControl;
