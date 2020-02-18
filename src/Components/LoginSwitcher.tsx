import React, { ReactElement, useState } from 'react';
import styled from 'styled-components/macro';

const LoginSwitcherStyled = styled.div`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-size: 22px;
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: 8px;
  font-weight: ${props => props.theme.font.fontWeight[300]};

  display: flex;
  flex-direction: row;
  background-color: transparent;
`;

const SelectStyled = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 4px;

  ${props =>
    props.typeActive === props.type
      ? `
  background-color: ${props.theme.colors.background.primary};
  color: ${props.theme.colors.text.primaryDark};
  padding-left: 40px;
  padding-right: 40px;
  `
      : `
  cursor: pointer;
  color: ${props.theme.colors.text.primaryLight};
  padding-left: 20px;
  padding-right: 20px;
  `};

  border-radius: 6px;
  transition: padding 200ms ease, background-color 200ms ease;
`;

type SelectTypes = 'login' | 'signup';

type StyledProps = {
  typeActive: SelectTypes;
  type: SelectTypes;
};

type Props = {
  className?: string;
};

const LoginSwitcher = ({ className }: Props): ReactElement => {
  const [typeActive, setTypeActive] = useState<SelectTypes>('login');

  return (
    <LoginSwitcherStyled className={className}>
      <SelectStyled typeActive={typeActive} type="login" onClick={() => setTypeActive('login')}>
        Log in
      </SelectStyled>
      <SelectStyled typeActive={typeActive} type="signup" onClick={() => setTypeActive('signup')}>
        Sign up
      </SelectStyled>
    </LoginSwitcherStyled>
  );
};

export default LoginSwitcher;
