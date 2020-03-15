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
  padding: 20px;

  @media ${props => props.theme.responsive.mobile} {
    padding: 20px 10px;
  }
`;

const HStyled = styled(H)`
  line-height: 30px;
`;

const DashboardTitle = ({ className, children }: Props): ReactElement => (
  <DashboardTitleStyled className={className}>
    <HStyled fontSize="medium" level="1" color="primaryLight" fontWeight="semiBold">
      {children}
    </HStyled>
  </DashboardTitleStyled>
);

export default DashboardTitle;
