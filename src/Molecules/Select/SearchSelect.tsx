import React, { ReactElement } from 'react';
import SelectStyle from 'Atoms/Select/SelectStyle';
import styled from 'styled-components/macro';
import SelectMenu from 'Atoms/Select/SelectMenu';
import SelectControl from 'Atoms/Select/SelectControl';
import { useHistory } from 'react-router-dom';
import { RouteConfig } from 'Routes/RouteConfig';
import { ReactComponent as Home } from 'Assets/Home.svg';
import { ReactComponent as CollectionIcon } from 'Assets/Collections.svg';
import { ReactComponent as RecordIcon } from 'Assets/Records.svg';
import { ReactComponent as Analysis } from 'Assets/Analysis.svg';
import { SearchSelectOption as SearchSelectOptionType } from 'Types/Select';
import SearchSelectOption from 'Atoms/Select/SearchSelectOption';
import { useQuery } from 'react-query';
import { getCollections } from 'API/Collection';
import { getRecords } from 'API/Record';
import Loader from 'Atoms/Loader/Loader';

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

  .${props => props.classNamePrefix}__search-icon {
    margin-left: 10px;
  }
`;

const optionsDefault: SearchSelectOptionType[] = [
  {
    value: RouteConfig.Dashboard.Home,
    label: 'Home',
    Icon: Home,
    type: 'page',
  },
  {
    value: RouteConfig.Dashboard.Collections.Root,
    label: 'Collections',
    Icon: CollectionIcon,
    type: 'page',
  },
  {
    value: RouteConfig.Dashboard.Records.Root,
    label: 'Records',
    Icon: RecordIcon,
    type: 'page',
  },
  {
    value: RouteConfig.Dashboard.Analysis,
    label: 'Analysis',
    Icon: Analysis,
    type: 'page',
  },
];

const SearchSelect = ({ className }: Props): ReactElement => {
  const { push } = useHistory();

  const { data: collections, status: collectionsStatus } = useQuery('collections', () => getCollections());
  const { data: records, status: recordsStatus } = useQuery('records', () => getRecords());

  if (!collections || collectionsStatus === 'loading' || !records || recordsStatus === 'loading') {
    return <Loader />;
  }

  const collectionOptions = collections.map<SearchSelectOptionType>(c => ({
    label: c.name,
    type: 'collection',
    value: `${RouteConfig.Dashboard.Collections.Root}/${c.id}`,
    Icon: c.image?.data || CollectionIcon,
  }));

  const recordsOptions = records.map<SearchSelectOptionType>(c => ({
    label: c.name,
    type: 'record',
    value: `${RouteConfig.Dashboard.Records.Root}/${c.id}`,
    Icon: c.image?.data || RecordIcon,
  }));

  const options = collectionOptions.concat(recordsOptions).concat(optionsDefault);

  const onChange = (option: SearchSelectOptionType): void => {
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
        Option: SearchSelectOption,
      }}
      options={options}
      onChange={onChange}
      isSearchable
      value={null}
      openMenuOnClick={false}
    />
  );
};

export default SearchSelect;
