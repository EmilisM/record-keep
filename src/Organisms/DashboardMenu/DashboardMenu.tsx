import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import DashboardMenuTitle from 'Molecules/Dashboard/DashboardMenuTitle';
import DashboardItems from 'Organisms/Dashboard/DashboardItems';
import DashboardMenuBottomContainer from 'Molecules/Dashboard/DashboardMenuBottomContainer';

const DashboardMenuStyled = styled.aside<Props>`
  height: 100%;
  width: 100%;
  max-width: ${props => (props.isOpen ? '300' : '60')}px;
  min-width: 60px;

  overflow: hidden;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }

  transition: all 0.3s ease;
  overflow-x: hidden;
`;

const DashboardItemsStyled = styled(DashboardItems)`
  margin-top: 50px;
`;

type Props = {
  className?: string;
  isOpen: boolean;
  onClick?: () => void;
};

const DashboardMenu = ({ className, isOpen, onClick }: Props): ReactElement => (
  <DashboardMenuStyled className={className} isOpen={isOpen} role="presentation">
    <DashboardMenuTitle isOpen={isOpen} onClick={onClick} />
    <DashboardItemsStyled />
    <DashboardMenuBottomContainer isOpen={isOpen} />
  </DashboardMenuStyled>
);

export default DashboardMenu;