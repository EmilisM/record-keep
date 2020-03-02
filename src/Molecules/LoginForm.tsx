import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';
import InputLabel from 'Atoms/Input/InputLabel';
import Button from 'Atoms/Button';
import LoginCard from 'Atoms/LoginCard';
import { LoginFormType } from 'Types/Login';
import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import { useHistory } from 'react-router-dom';
import RouteConfig from 'Routes/RouteConfig';

type StyledProps = {
  type?: LoginFormType;
};

const BaseInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MiddleInputContainer = styled(BaseInputContainer)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AnimatedInputContainer = styled(BaseInputContainer)<StyledProps>`
  transition: all 0.2s ease;
  overflow: hidden;

  max-height: ${props => (props.type === 'signup' ? '100px' : '0px')};
  margin-bottom: ${props => (props.type === 'signup' ? '20px' : '0px')};
`;

const InputLabelStyled = styled(InputLabel)`
  margin-bottom: 5px;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  text-align: left;
  display: flex;
`;

const ArrowStyled = styled(Arrow)`
  height: 25px;
  width: 25px;

  margin: 0 0 0 auto;
  fill: ${props => props.theme.colors.text.primaryDark};
`;

type Props = {
  className?: string;
  type: LoginFormType;
};

const LoginForm = ({ className, type }: Props): ReactElement => {
  const { push } = useHistory();

  return (
    <LoginCard className={className}>
      <BaseInputContainer>
        <InputLabelStyled fontWeight="regular" htmlFor="form-email">
          Email
        </InputLabelStyled>
        <Input fontWeight="light" type="email" placeholder="Email" id="form-email" />
      </BaseInputContainer>
      <MiddleInputContainer>
        <InputLabelStyled fontWeight="regular" htmlFor="form-password">
          Password
        </InputLabelStyled>
        <Input fontWeight="light" type="password" placeholder="Password" id="form-password" />
      </MiddleInputContainer>
      <AnimatedInputContainer type={type}>
        <InputLabelStyled fontWeight="regular" htmlFor="form-repeat-password">
          Repeat password
        </InputLabelStyled>
        <Input fontWeight="light" type="password" placeholder="Password" id="form-repeat-password" />
      </AnimatedInputContainer>
      <ButtonStyled fontWeight="light" onClick={() => push(RouteConfig.Dashboard)}>
        {type === 'login' ? 'Log in' : 'Sign up'}
        <ArrowStyled />
      </ButtonStyled>
    </LoginCard>
  );
};

export default LoginForm;
