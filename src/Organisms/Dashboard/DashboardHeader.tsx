import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import DashboardTitle from 'Molecules/Dashboard/DashboardTitle';
import SearchSelect from 'Molecules/SearchSelect';

const DashboardHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 15px 20px;

  height: 100%;
  max-height: 70px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 15px 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 15px 10px;
  }
`;

type Props = {
  className?: string;
  title: string;
};

const DashboardHeader = ({ className, title }: Props): ReactElement => (
  <DashboardHeaderStyled className={className}>
    <DashboardTitle>{title}</DashboardTitle>
    <SearchSelect />
  </DashboardHeaderStyled>
);

export default DashboardHeader;
