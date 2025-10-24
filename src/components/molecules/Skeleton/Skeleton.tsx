import React from 'react';

export interface SkeletonProps {
  variant?: 'card' | 'text' | 'image' | 'circular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
}) => {
  const classes = [
    'skeleton',
    `skeleton--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const style = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return <div className={classes} style={style} />;
};

export const PokemonCardSkeleton: React.FC = () => {
  return (
    <div className="pokemon-card pokemon-card--skeleton">
      <Skeleton variant="circular" className="pokemon-card__image" />
      <Skeleton variant="text" className="pokemon-card__name" />
      <Skeleton variant="text" className="pokemon-card__id" width="3rem" />
    </div>
  );
};

export default Skeleton;