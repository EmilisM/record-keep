import React, { ReactElement } from 'react';
import SelectStyle from 'Atoms/Select/SelectStyle';
import { SelectOption } from 'Types/Select';

type Props = {
  className?: string;
  classNamePrefix?: string;
  placeholder?: string;
  showSearch?: boolean;
  isSearchable?: boolean;
  value?: SelectOption | SelectOption[];
  isMulti?: boolean;
  options: SelectOption[];
  onChange: (option: SelectOption) => void | ((options: SelectOption[]) => void);
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
  isMulti,
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
    isMulti={isMulti}
  />
);

export default Select;
