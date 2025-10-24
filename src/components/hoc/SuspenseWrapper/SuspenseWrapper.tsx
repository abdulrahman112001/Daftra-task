import React from 'react';
import { Spinner } from '../../atoms';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ 
  children, 
  fallback,
  className = ''
}) => {
  const defaultFallback = (
    <div className={`suspense-fallback ${className}`}>
      <Spinner size="large" />
      <p>Loading Pokemon data...</p>
    </div>
  );

  return (
    <React.Suspense fallback={fallback || defaultFallback}>
      {children}
    </React.Suspense>
  );
};

export default SuspenseWrapper;