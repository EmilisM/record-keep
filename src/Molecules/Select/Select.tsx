import React, { ReactElement } from 'react';
import SelectStyle from 'Atoms/Select/SelectStyle';
import { SelectOption } from 'Types/Select';

type Props = {
  className?: string;
  classNamePrefix?: string;
  placeholder?: string;
  showSearch?: boolean;
  isSearchable?: boolean;
  value?: SelectOption;
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
};

const Select = ({
  className,
  classNamePrefix = 'select-styled',
  placeholder,
  showSearch,
  options,
  onChange,
  isSearchable,
  value,
}: Props): ReactElement => (
  <SelectStyle
    className={className}
    classNamePrefix={classNamePrefix}
    placeholder={placeholder}
    showSearch={showSearch}
    options={options}
    onChange={onChange}
    isSearchable={isSearchable}
    value={value}
  />
);

export default Select;
