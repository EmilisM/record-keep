import React, { ReactElement, ChangeEvent } from 'react';
import styled from 'styled-components/macro';
import InputDashboard from 'Atoms/Input/InputDashboard';
import Card from 'Atoms/Card/Card';
import H from 'Atoms/Text/H';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 20px;

  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 15px 10px;
  }
`;

const InputDashboardStyled = styled(InputDashboard)`
  margin-top: 10px;
`;

type Props = {
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  placeholder: string;
};

const FilterCard = ({ className, onChange, value, label, placeholder }: Props): ReactElement => (
  <CardStyled className={className}>
    <Column>
      <H key="description" fontWeight="regular" color="primaryLight" fontSize="regular" level="2">
        {label}
      </H>
      <InputDashboardStyled
        id="input"
        name="input"
        placeholder={placeholder}
        color="primaryLight"
        fontWeight="regular"
        fontSize="normal"
        onChange={onChange}
        value={value}
      />
    </Column>
  </CardStyled>
);

export default FilterCard;
