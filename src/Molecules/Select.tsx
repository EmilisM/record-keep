import React, { ReactElement } from 'react';
import SelectStyle from 'Atoms/Select/SelectStyle';

type Props = {
  className?: string;
  classNamePrefix?: string;
  placeholder?: string;
  showSearch?: boolean;
};

const Select = ({ className, classNamePrefix = 'select-styled', placeholder, showSearch }: Props): ReactElement => (
  <SelectStyle
    className={className}
    classNamePrefix={classNamePrefix}
    placeholder={placeholder}
    showSearch={showSearch}
  />
);

export default Select;
