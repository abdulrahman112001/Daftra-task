import React from 'react';

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  className = '',
}) => {
  const classes = [
    'spinner',
    `spinner--${size}`,
    `spinner--${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="spinner__circle"></div>
    </div>
  );
};

export default Spinner;