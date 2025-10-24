import React from 'react';
import { Button, Text } from '../../atoms';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
  className?: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <div className={this.props.className}>
          <FallbackComponent 
            error={this.state.error} 
            resetError={this.resetError} 
          />
        </div>
      );
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; resetError: () => void }> = ({ 
  error, 
  resetError 
}) => (
  <div className="error-boundary">
    <div className="error-boundary__content">
      <Text variant="title" color="danger" as="h2">
        🚨 Oops! Something went wrong
      </Text>
      
      <Text variant="body" color="muted" className="error-boundary__message">
        {error?.message || 'An unexpected error occurred'}
      </Text>
      
      <details className="error-boundary__details">
        <summary>Error Details</summary>
        <pre>{error?.stack}</pre>
      </details>
      
      <div className="error-boundary__actions">
        <Button variant="primary" onClick={resetError}>
          Try Again
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </div>
    </div>
  </div>
);

export default ErrorBoundary;