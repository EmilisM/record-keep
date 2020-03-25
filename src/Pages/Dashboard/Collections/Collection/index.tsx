import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

type MatchParams = {
  collectionName: string;
};

type Props = RouteComponentProps<MatchParams>;

const Collection = (props: Props): ReactElement => {
  return <div>{props.match.params.collectionName}</div>;
};

export default Collection;
