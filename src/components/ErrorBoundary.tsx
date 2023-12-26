// @ts-nocheck
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      return null;
    }

    return this.props?.children;
  }
}

export default ErrorBoundary;
