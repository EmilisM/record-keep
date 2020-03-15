import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import P from 'Atoms/Text/P';

const BottomContainer = styled.div`
  width: 100%;
  margin-top: auto;

  border-image: linear-gradient(
      110deg,
      ${props => props.theme.colors.background.secondaryLighter} -10%,
      ${props => props.theme.colors.background.secondaryDarkLighter} 10%,
      ${props => props.theme.colors.background.secondaryDarkerLighter} 40%,
      ${props => props.theme.colors.background.secondaryDarkestLighter} 100%
    )
    1 0 0 / 2px;

  display: flex;
  align-items: center;
  padding: 10px 20px;

  min-height: 40px;
`;

const BottomText = styled(P)`
  white-space: nowrap;

  opacity: 0.8;
`;

type Props = {
  className?: string;
  isOpen: boolean;
};

const DashboardMenuBottomContainer = ({ className, isOpen }: Props): ReactElement => (
  <BottomContainer className={className}>
    {isOpen && (
      <BottomText fontWeight="light" fontSize="small">
        Emilis Makutėnas - 2020
      </BottomText>
    )}
  </BottomContainer>
);

export default DashboardMenuBottomContainer;
