import React, { ReactElement, ReactText } from 'react';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';

type Props = {
  className?: string;
  children: ReactText;
};

const DashboardTitleStyled = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  padding: 10px 10px 20px;
`;

const DashboardTitle = ({ className, children }: Props): ReactElement => (
  <DashboardTitleStyled className={className}>
    <H fontSize="big" level="1" color="primaryDark" fontWeight="bold">
      {children}
    </H>
  </DashboardTitleStyled>
);

export default DashboardTitle;
