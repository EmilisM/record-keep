import React, { ReactNode, ReactElement } from 'react';

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props): ReactElement => <div>{children}</div>;

export default AppLayout;
