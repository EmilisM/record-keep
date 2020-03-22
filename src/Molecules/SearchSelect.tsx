import React, { ReactElement } from 'react';
import SelectStyle from 'Atoms/Select/SelectStyle';
import styled from 'styled-components/macro';
import SelectMenu from 'Atoms/Select/SelectMenu';
import SelectControl from 'Atoms/Select/SelectControl';
import { useHistory } from 'react-router-dom';

import { DashboardRouteConfig } from 'Routes/RouteConfig';

type Props = {
  className?: string;
};

const SelectStyled = styled(SelectStyle)`
  min-width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }

  .${props => props.classNamePrefix}__menu-list {
    padding: 0;
  }
`;

type SearchSelectOption = {
  value: string;
  label: string;
};

const options: SearchSelectOption[] = [
  {
    value: DashboardRouteConfig.DashboardHome,
    label: 'Home',
  },
  {
    value: DashboardRouteConfig.DashboardCollections,
    label: 'Collections',
  },
  {
    value: DashboardRouteConfig.DashboardAnalysis,
    label: 'Analysis',
  },
];

const SearchSelect = ({ className }: Props): ReactElement => {
  const { push } = useHistory();

  const onChange = (option: SearchSelectOption): void => {
    push(option.value);
  };

  return (
    <SelectStyled
      className={className}
      classNamePrefix="search-select"
      placeholder="Search"
      showSearch
      components={{
        Menu: SelectMenu,
        Control: SelectControl,
      }}
      options={options}
      onChange={onChange}
      isSearchable
      value={null}
    />
  );
};

export default SearchSelect;
