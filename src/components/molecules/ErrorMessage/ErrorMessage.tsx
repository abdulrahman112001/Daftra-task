import React from 'react';
import { Button, Text } from '../../atoms';

export interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Oops! Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  className = '',
}) => {
  return (
    <div className={`error-message ${className}`}>
      <div className="error-message__content">
        <Text variant="title" color="danger" as="h3">
          {title}
        </Text>
        
        <Text variant="body" color="muted" className="error-message__description">
          {message}
        </Text>
        
        {onRetry && (
          <div className="error-message__actions">
            <Button variant="primary" onClick={onRetry}>
              {retryLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;