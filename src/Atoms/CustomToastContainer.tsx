import React, { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components/macro';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainerStyled = styled(ToastContainer)`
  top: 80px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: unset;
    bottom: 0px;
    left: 0px;
  }

  .Toastify__toast {
    background: ${props => props.theme.colors.background.secondaryDark};
    font-family: ${props => props.theme.font.fontFamily.primary};
    font-size: 20px;

    border-radius: 4px;

    @media (max-width: ${props => props.theme.breakpoints.desktop}) {
      font-size: 18px;
    }

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: 16px;
    }
  }

  .Toastify__toast-body {
    margin: 0;
  }

  .Toastify__progress-bar--success {
    background: ${props => props.theme.colors.special.success};
  }

  .Toastify__progress-bar--error {
    background: ${props => props.theme.colors.special.error};
  }
`;

const CustomToastContainer = (): ReactElement => <ToastContainerStyled autoClose={2000} />;

export default CustomToastContainer;
