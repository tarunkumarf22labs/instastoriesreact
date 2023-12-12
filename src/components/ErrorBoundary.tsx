// @ts-nocheck
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // You can log the error or send it to a logging service
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      // You can render a fallback UI here
      return <div>Something went wrong!</div>;
    }

    return this.props?.children;
  }
}

export default ErrorBoundary;
