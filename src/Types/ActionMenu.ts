import { FC, SVGProps } from 'react';

export interface ActionMenuOption {
  value: string;
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}
