import React, { ReactElement, FC } from 'react';
import { RouteProps, RouteComponentProps, match } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { CollectionMatchParams } from 'Types/Collection';

type Props = RouteProps & {
  component: FC<RouteComponentProps<CollectionMatchParams>>;
  computedMatch?: match<CollectionMatchParams>;
};

const CollectionLayout = ({ computedMatch, ...rest }: Props): ReactElement => (
  <DashboardLayout title={`Collection: ${computedMatch?.params.collectionName}`} {...rest} />
);

export default CollectionLayout;
