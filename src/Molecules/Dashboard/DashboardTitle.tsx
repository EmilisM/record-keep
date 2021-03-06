import React, { ReactElement, ReactText } from 'react';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';

type Props = {
  className?: string;
  children: ReactText;
};

const DashboardTitleStyled = styled.div`
  display: flex;
  align-items: center;
`;

const HStyled = styled(H)`
  line-height: 30px;
`;

const DashboardTitle = ({ className, children }: Props): ReactElement => (
  <DashboardTitleStyled className={className}>
    <HStyled fontSize="dashboardTitle" level="1" color="primaryLight" fontWeight="semiBold">
      {children}
    </HStyled>
  </DashboardTitleStyled>
);

export default DashboardTitle;
