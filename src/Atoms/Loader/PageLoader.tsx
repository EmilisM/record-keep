import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/macro';
import Loader from 'Atoms/Loader/Loader';
import { CSSTransition } from 'react-transition-group';

type Props = {
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
  timeout?: number;
};

const Container = styled.div<Pick<Props, 'timeout'>>`
  width: 100%;
  height: 100%;

  background-color: ${props => props.theme.colors.background.secondaryDark};

  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;

  top: 0;
  left: 0;
  z-index: 200;

  &.page-loader-appear {
    opacity: 0;
    display: flex;
  }

  &.page-loader-appear-active {
    opacity: 1;
    transition: opacity ${props => props.timeout}ms;
    display: flex;
  }

  &.page-loader-enter {
    opacity: 0;
    display: flex;
  }

  &.page-loader-enter-active {
    opacity: 1;
    transition: opacity ${props => props.timeout}ms;
    display: flex;
  }

  &.page-loader-exit {
    opacity: 1;
    display: flex;
  }

  &.page-loader-exit-active {
    opacity: 0;
    transition: opacity ${props => props.timeout}ms;
    display: flex;
  }

  &.page-loader-exit-done {
    opacity: 0;
    display: none;
  }
`;

const LoaderStyled = styled(Loader)`
  width: 50px;
  height: 50px;
`;

export const PageLoader = ({ className, isLoading, children, timeout = 300 }: Props): ReactElement => (
  <>
    <CSSTransition in={isLoading} appear unmountOnExit timeout={timeout} classNames="page-loader">
      <Container className={className} timeout={timeout}>
        <LoaderStyled />
      </Container>
    </CSSTransition>
    {!isLoading && children}
  </>
);
