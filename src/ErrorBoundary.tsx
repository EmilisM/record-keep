import { Component, ReactNode, ErrorInfo, ReactElement } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  error: (error?: Error) => ReactElement;
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: Readonly<ErrorBoundaryProps>) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.error(this.state.error);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
