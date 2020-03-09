import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';

import DashboardMenuTitle from 'Molecules/Dashboard/DashboardMenuTitle';
import DashboardMenuItems from 'Organisms/Dashboard/DashboardMenuItems';

const DashboardMenuStyled = styled.div<Props>`
  height: 100%;
  width: 100%;
  max-width: ${props => (props.isOpen ? '300' : '60')}px;

  background-image: linear-gradient(
    110deg,
    ${props => props.theme.colors.background.secondary} -10%,
    ${props => props.theme.colors.background.secondaryDark} 10%,
    ${props => props.theme.colors.background.secondaryDarker} 40%,
    ${props => props.theme.colors.background.secondaryDarkest} 100%
  );

  border: solid;
  border-width: 0 1px 0 0;
  border-color: ${props => props.theme.colors.border.primary};
  overflow: hidden;

  display: flex;
  flex-direction: column;

  @media ${props => props.theme.responsive.mobile} {
    display: none;
  }

  transition: all 0.3s ease;
`;

const DashboardMenuItemsStyled = styled(DashboardMenuItems)`
  margin-top: 50px;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: auto;

  border-image: linear-gradient(
      110deg,
      ${props => props.theme.colors.background.secondaryLighter} -10%,
      ${props => props.theme.colors.background.secondaryDarkLighter} 10%,
      ${props => props.theme.colors.background.secondaryDarkerLighter} 40%,
      ${props => props.theme.colors.background.secondaryDarkestLighter} 100%
    )
    1 0 0 / 2px;
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
    <BottomContainer />
  </DashboardMenuStyled>
);

export default DashboardMenu;
