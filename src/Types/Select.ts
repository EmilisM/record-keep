import { FC } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

type SearchOptionType = 'page' | 'collection' | 'record';

export interface SearchSelectOption {
  value: string;
  label: string;
  Icon: FC | string;
  type: SearchOptionType;
}
