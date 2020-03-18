import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import DashboardMenuTitle from 'Molecules/Dashboard/DashboardMenuTitle';
import DashboardMenuItems from 'Organisms/Dashboard/DashboardMenuItems';
import DashboardMenuBottomContainer from 'Molecules/Dashboard/DashboardMenuBottomContainer';

const DashboardMenuStyled = styled.aside<Props>`
  height: 100%;
  width: 100%;
  max-width: ${props => (props.isOpen ? '300' : '60')}px;
  min-width: 60px;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }

  transition: all 0.3s ease;
`;

const DashboardMenuItemsStyled = styled(DashboardMenuItems)`
  margin-top: 50px;
`;

type Props = {
  className?: string;
  isOpen: boolean;
  onClick?(): void;
};

const DashboardMenu = ({ className, isOpen, onClick }: Props): ReactElement => (
  <DashboardMenuStyled className={className} isOpen={isOpen} role="presentation">
    <DashboardMenuTitle isOpen={isOpen} onClick={onClick} />
    <DashboardMenuItemsStyled />
    <DashboardMenuBottomContainer isOpen={isOpen} />
  </DashboardMenuStyled>
);

export default DashboardMenu;
