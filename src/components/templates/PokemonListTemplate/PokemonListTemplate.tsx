import React from 'react';
import { Text } from '../../atoms';
import { PokemonGrid, Pagination } from '../../organisms';
import { ErrorMessage } from '../../molecules';
import type { Pokemon } from '../../../types/pokemon';

export interface PokemonListTemplateProps {
  title: string;
  subtitle?: string;
  pokemon: Pokemon[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    hasNext: boolean;
    hasPrev: boolean;
    onNext: () => void;
    onPrev: () => void;
  };
  className?: string;
}

const PokemonListTemplate: React.FC<PokemonListTemplateProps> = ({
  title,
  subtitle,
  pokemon,
  loading = false,
  error,
  onRetry,
  pagination,
  className = '',
}) => {
  if (error) {
    return (
      <div className={`pokemon-list-template ${className}`}>
        <ErrorMessage 
          message={error} 
          onRetry={onRetry} 
        />
      </div>
    );
  }

  return (
    <div className={`pokemon-list-template ${className}`}>
      <div className="page-header">
        <Text variant="heading" color="default" as="h1">
          {title}
        </Text>
        {subtitle && (
          <Text variant="subtitle" color="muted" className="page-subtitle">
            {subtitle}
          </Text>
        )}
      </div>

      <PokemonGrid 
        pokemon={pokemon} 
        loading={loading}
        skeletonCount={20}
      />

      {pagination && !loading && !error && (
        <Pagination {...pagination} />
      )}
    </div>
  );
};

export default PokemonListTemplate;