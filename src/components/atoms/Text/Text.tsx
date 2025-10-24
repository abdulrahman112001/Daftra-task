import React from 'react';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'caption' | 'subtitle' | 'title' | 'heading';
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'danger';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'default',
  align = 'left',
  weight = 'normal',
  className = '',
  as: Component = 'p',
}) => {
  const classes = [
    'text',
    `text--${variant}`,
    `text--${color}`,
    `text--${align}`,
    `text--${weight}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
};

export default Text;